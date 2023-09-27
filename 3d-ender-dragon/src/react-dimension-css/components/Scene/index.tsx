"use client";

import classes from "./styles.module.css";
import React from "react";
import useMemoizedObject from "../../hooks/useMemoizedObject";
import useMousePosition, {MousePosition} from "../../hooks/useMousePosition";
import useElementDimension, {ElementDimension} from "../../hooks/useElementDimension";
import useMousedown from "../../hooks/useMousedown";
import useTouch, {TouchPosition} from "../../hooks/useTouch";

export interface SceneContext {
    _instanceExists: boolean;
    mousePosition: MousePosition;
    sceneDimension: ElementDimension;
    touchPosition: TouchPosition;
    mousedown: boolean;
    touchdown: boolean;
}

export interface SceneProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    background?: string;
    width?: string;
    height?: string;
    perspective?: string;
    perspectiveOriginX?: string;
    perspectiveOriginY?: string;
}

export const SceneContext = React.createContext<SceneContext>({
    _instanceExists: false,
    sceneDimension: {width: 0, height: 0},
    mousePosition: {x: 0, y: 0, dx: 0, dy: 0},
    mousedown: false,
    touchPosition: {x: 0, y: 0, dx: 0, dy: 0, flickX: 0, flickY: 0},
    touchdown: false,
});

export function useScene() {
    const parentContextValue = React.useContext(SceneContext);
    if (!parentContextValue._instanceExists) {
        throw new Error("This component can only be inserted inside a scene.");
    }
    return parentContextValue;
}

function _Scene(props: SceneProps) {
    const ref = React.useRef<HTMLDivElement|null>(null);

    const touchData = useTouch(ref);

    const ctx: SceneContext = {
        _instanceExists: true,
        mousedown: useMousedown(ref),
        mousePosition: useMousePosition(ref),
        sceneDimension: useElementDimension(ref),
        touchdown: touchData.touchdown,
        touchPosition: touchData.touchPosition,
    };

    const contextValue = useMemoizedObject(ctx);
    const inlineStyles: React.CSSProperties = {
        perspective: props.perspective,
        background: props.background,
        width: props.width,
        height: props.height,
    };

    if (props.perspectiveOriginX !== undefined || props.perspectiveOriginY !== undefined) {
        inlineStyles.perspectiveOrigin = `calc(50% + ${props.perspectiveOriginX ?? "0px"}) calc(50% + ${props.perspectiveOriginY ?? "0px"})`;
    }

    Object.assign(inlineStyles, props.style);

    return <SceneContext.Provider value={contextValue}>
        <div className={`${classes.scene} ${props.className ?? ''}`} style={inlineStyles} ref={e => {
            ref.current = e;
        }}>
            {props.children}
        </div>
    </SceneContext.Provider>;
}

const Scene = React.memo(_Scene);
export default Scene;
