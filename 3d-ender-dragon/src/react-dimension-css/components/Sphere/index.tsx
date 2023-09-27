import React, {JSX} from "react";
import classes from './styles.module.css';
export interface RootProps extends React.ComponentProps<"div"> {
    className?: string;
    children?: JSX.Element | JSX.Element[];
    radius?: string;
    x?: string;
    y?: string;
    z?: string;
    styles?: React.CSSProperties;
    sides?: number;
}

export interface ArcProps extends React.ComponentProps<"div"> {
    className?: string;
    children?: JSX.Element | JSX.Element[];
    styles?: React.CSSProperties;
    sides?: number;
    rotation?: string;
}

export interface FaceProps extends React.ComponentProps<"div"> {
    className?: string;
    children?: React.ReactNode;
    clipPath?: string;
    background?: string;
    styles?: React.CSSProperties;
    rotation?: string;
}

function computeClipPathPoints(multiplier: number) {
    return [50 - 50 * multiplier, 50 + 50 * multiplier];
}

function _Root(props: RootProps, ref: React.ForwardedRef<HTMLDivElement>) {
    const {x, y, z, radius, sides=20, ...delegated} = props;

    const unitSideAngle = 2 * Math.PI / sides;
    const computedFaceDimension = `calc(var(--radius) * ${2 * Math.tan(unitSideAngle / 2)})`;

    const slices = React.useMemo(() => {
        let rawSlices = props.children;
        let phase2: JSX.Element[];

        if (!rawSlices) {
            phase2 = [];
        } else if (!Array.isArray(rawSlices)) {
            phase2 = [rawSlices];
        } else {
            phase2 = rawSlices;
        }

        return phase2.map((node: JSX.Element, index) => {
            return React.cloneElement(node, {
                sides: sides,
                rotation: `${index * unitSideAngle + 0.5 * unitSideAngle}rad`,
                key: node.key ?? index,
                ...node.props,
            });
        });
    }, [props.children, sides, unitSideAngle]);

    return <div {...delegated} className={`${classes.root} ${props.className ?? ''}`} style={
        {
            "--radius": radius,
            "--x": x,
            "--y": y,
            "--z": z,
            "--faceHeight": computedFaceDimension,
            "--faceWidth": computedFaceDimension,
            ...props.styles,
        } as React.CSSProperties
    } ref={ref}>{slices}</div>;
}

function _Arc(props: ArcProps, ref: React.ForwardedRef<HTMLDivElement>) {

    const {sides=20, rotation="20deg", ...delegated} = props;

    const unitSideAngle = 2 * Math.PI / sides;
    const slices = React.useMemo(() => {
        let rawSlices = props.children;
        let phase2: JSX.Element[];

        if (!rawSlices) {
            phase2 = [];
        } else if (!Array.isArray(rawSlices)) {
            phase2 = [rawSlices];
        } else {
            phase2 = rawSlices;
        }

        return phase2.map((node: JSX.Element, index) => {
            const angle = index * unitSideAngle + 0.5 * unitSideAngle - Math.PI / 2;

            const radiusStop1 = angle - 0.5 * unitSideAngle + Math.PI / 2;
            const radiusStop2 = radiusStop1 + unitSideAngle;

            const stop1LengthMultiplier = Math.abs(Math.sin(radiusStop1));
            const stop2LengthMultiplier = Math.abs(Math.sin(radiusStop2));

            const clipCoords1 = computeClipPathPoints(stop1LengthMultiplier);
            const clipCoords2 = computeClipPathPoints(stop2LengthMultiplier);

            const clipPathLines = [
                `${clipCoords2[0]}% 0`,
                `${clipCoords2[1]}% 0`,
                `${clipCoords1[1]}% 100%`,
                `${clipCoords1[0]}% 100%`,
            ]

            const clipPath = `polygon(${clipPathLines.join(", ")})`

            return React.cloneElement(node, {
                clipPath: clipPath,
                rotation: `${angle}rad`,
                key: node.key ?? index,
                ...node.props,
            });
        });
    }, [props.children, unitSideAngle]);

    return <div {...delegated} className={`${classes.arc} ${props.className ?? ''}`} style={
        {
            "--rotation": rotation,
            ...props.styles,
        } as React.CSSProperties
    } ref={ref}>{slices}</div>;
}

function _Face(props: FaceProps, ref: React.ForwardedRef<HTMLDivElement>) {
    const {clipPath, background, rotation, ...delegated} = props;

    return <div {...delegated} className={`${classes.face} ${props.className ?? ''}`} style={{
        "--rotation": rotation,
        clipPath: clipPath,
        background: background,
        ...props.styles,
    } as React.CSSProperties} ref={ref}></div>
}

const Sphere = {
    Root: React.memo(React.forwardRef(_Root)),
    Arc: React.memo(React.forwardRef(_Arc)),
    Face: React.memo(React.forwardRef(_Face)),
}

export default Sphere;
