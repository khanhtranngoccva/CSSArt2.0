"use client";

import React, {useEffect} from "react";
import {useScene} from "../Scene";
import classes from "./styles.module.css";
import {useStateWithDeps} from "use-state-with-deps";
import {useCustomEventListener} from "../../hooks/useEventListener";

function toDegrees(angle: string) {
    const [_, quantity, exponent, unit] = angle.match(/^([\-0-9.]+)(e?[\-0-9]*)([a-z]*)$/i) || [];
    const parsedQty = quantity + exponent;
    if (!unit) return +parsedQty;
    if (unit === "turn") return +parsedQty * 360;
    if (unit === "rad") return +parsedQty * 180 / Math.PI;
    if (unit === "deg") return +parsedQty;
    throw new Error(`Unrecognized unit ${unit}. Input: ${angle}`);
}

function coerceDegrees(angle: string | undefined) {
    if (angle === undefined) {
        return 0;
    } else {
        return toDegrees(angle);
    }
}

function fixAngle(angle: number) {
    let remainder = angle % 360;
    if (remainder < 0) remainder += 360;
    return remainder;
}

interface RotateEventData {
    rotation: { rotateX: string, rotateY: string, rotateZ: string };
}

// Whatever, polyfill.
try {
    class CustomEvent<T> extends Event {
        _detail: T;

        constructor(type: string, options: {bubbles?: boolean, composed?: boolean, detail: T, cancelable?: boolean}) {
            super(type, options);
            this._detail = options.detail;
        }

        get detail() {
            return this._detail;
        }
    }

    if (!global.CustomEvent) {
        // @ts-ignore
        global.CustomEvent = CustomEvent;
    }
} catch (e) {
}

class RotateEvent extends CustomEvent<RotateEventData> {
    // @ts-ignore
    type: "rotate";

    constructor(data: RotateEventData) {
        super("rotate", {detail: data, });
    }
}

interface CameraProps {
    style?: React.CSSProperties;
    rotateX?: string;
    rotateY?: string;
    rotateZ?: string;
    initialRotateX?: string;
    initialRotateY?: string;
    initialRotateZ?: string;
    canRotate?: boolean;
    onRotate?: (evt: RotateEvent) => void;
    className?: string;
    children?: React.ReactNode;
    rotationSensitivity?: number;
}

function _Camera(props: CameraProps) {
    const sceneInfo = useScene();

    let isForcedUpdate = false;
    const cameraRef = React.useRef<HTMLDivElement>(null);
    const sensitivity = props.rotationSensitivity ?? 200;

    const [rotateX, setRotateX] = useStateWithDeps(() => {
        isForcedUpdate = true;
        return props.rotateX ?? props.initialRotateX;
    }, [props.rotateX]);
    const [rotateY, setRotateY] = useStateWithDeps(() => {
        isForcedUpdate = true;
        return props.rotateY ?? props.initialRotateY;
    }, [props.rotateY]);
    const [rotateZ, setRotateZ] = useStateWithDeps(() => {
        isForcedUpdate = true;
        return props.rotateZ ?? props.initialRotateZ;
    }, [props.rotateZ]);

    React.useEffect(() => {
        if (!props.canRotate) return;
        if (!sceneInfo.sceneDimension.width || !sceneInfo.sceneDimension.height) return;
        if (!sceneInfo.mousedown) return;

        const dx = sceneInfo.mousePosition.dx;
        const dy = sceneInfo.mousePosition.dy;

        if (!dx && !dy) return;

        setRotateY(rotateY => (coerceDegrees(rotateY) + sensitivity * dx / sceneInfo.sceneDimension.width).toFixed(3) + "deg");
        setRotateX(rotateX => (coerceDegrees(rotateX) - sensitivity * dy / sceneInfo.sceneDimension.height).toFixed(3) + "deg");
    }, [sceneInfo.mousedown, sceneInfo.mousePosition, sceneInfo.sceneDimension, sensitivity, setRotateX, setRotateY, props.canRotate]);

    React.useEffect(() => {
        if (!props.canRotate) return;
        if (!sceneInfo.sceneDimension.width || !sceneInfo.sceneDimension.height) return;

        const dx = sceneInfo.touchPosition.dx;
        const dy = sceneInfo.touchPosition.dy;

        const flickX = sceneInfo.touchPosition.flickX;
        const flickY = sceneInfo.touchPosition.flickY;

        if (!sceneInfo.touchdown) {
            setRotateY(rotateY => (coerceDegrees(rotateY) + sensitivity * flickX / sceneInfo.sceneDimension.width).toFixed(3) + "deg");
            setRotateX(rotateX => (coerceDegrees(rotateX) - sensitivity * flickY / sceneInfo.sceneDimension.height).toFixed(3) + "deg");
        } else {
            setRotateY(rotateY => (coerceDegrees(rotateY) + sensitivity * dx / sceneInfo.sceneDimension.width).toFixed(3) + "deg");
            setRotateX(rotateX => (coerceDegrees(rotateX) - sensitivity * dy / sceneInfo.sceneDimension.height).toFixed(3) + "deg");
        }
    }, [sceneInfo.touchdown, sceneInfo.touchPosition, sceneInfo.sceneDimension, sensitivity, setRotateX, setRotateY, props.canRotate]);


    useCustomEventListener<RotateEvent>(cameraRef, "rotate", evt => {
        return props.onRotate?.(evt);
    });

    useEffect(() => {
        let _rotateX = rotateX ?? getComputedStyle(cameraRef.current!).getPropertyValue("--rotateX");
        let _rotateY = rotateY ?? getComputedStyle(cameraRef.current!).getPropertyValue("--rotateY");
        let _rotateZ = rotateZ ?? getComputedStyle(cameraRef.current!).getPropertyValue("--rotateZ");

        if (!isForcedUpdate) {
            cameraRef.current?.dispatchEvent(new RotateEvent({
                rotation: {
                    rotateX: _rotateX,
                    rotateY: _rotateY,
                    rotateZ: _rotateZ
                }
            }));
        }
    }, [isForcedUpdate, rotateX, rotateY, rotateZ]);

    let cursor: string | undefined;
    if (props.canRotate) {
        cursor = sceneInfo.mousedown || sceneInfo.touchdown ? "grabbing" : "grab";
    }

    return <div className={`${classes.camera} ${props.className ?? ''}`} ref={cameraRef} style={{
        "--rotateX": props.rotateX ?? rotateX,
        "--rotateY": props.rotateY ?? rotateY,
        "--rotateZ": props.rotateZ ?? rotateZ,
        cursor,
        ...props.style,
    } as React.CSSProperties}>
        <div className={classes.cameraRotator}>
            {props.children}
        </div>
    </div>;
}

const Camera = React.memo(_Camera);

export default Camera;
