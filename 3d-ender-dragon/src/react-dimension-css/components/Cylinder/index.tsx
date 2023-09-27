import React, {CSSProperties, JSX} from "react";
import classes from './styles.module.css';

interface RootProps extends React.ComponentProps<"div"> {
    className?: string;
    children?: JSX.Element | JSX.Element[];
    radius?: string; // z-dimension
    height?: string; // height-dimension
    x?: string;
    y?: string;
    z?: string;
    styles?: CSSProperties;
    sides?: number;
}

interface SideProps extends React.ComponentProps<"div"> {
    className?: string;
    children?: React.ReactNode;
    rotation?: string;
    background?: string;
    styles?: CSSProperties;
}

function _Root(props: RootProps, ref: React.ForwardedRef<HTMLDivElement>) {
    const {radius, height, sides, x, y, z, ...delegated} = props;

    const unitSideAngle = 2 * Math.PI / (sides ?? 20);
    const computedSideWidth = `calc(var(--radius) * ${2 * Math.tan(unitSideAngle / 2)})`;

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
                rotation: `${index * unitSideAngle - 0.5 * unitSideAngle}rad`,
                key: node.key ?? index,
                ...node.props,
            });
        });
    }, [props.children, unitSideAngle]);

    return <div {...props} className={`${classes.root} ${props.className ?? ''}`} style={
        {
            "--radius": radius,
            "--height": height,
            "--x": x,
            "--y": y,
            "--z": z,
            "--_sideWidth": computedSideWidth,
            ...props.styles
        } as React.CSSProperties
    } ref={ref}>{slices}</div>;
}

function _Side(props: SideProps, ref: React.ForwardedRef<HTMLDivElement>) {
    const {rotation, background, ...delegated} = props;

    return <div {...delegated} className={`${classes.side} ${props.className ?? ''}`} ref={ref} style={{
        "--rotation": rotation,
        background: background,
        ...props.styles,
    } as React.CSSProperties}></div>;
}

const Cylinder = {
    Root: React.memo(React.forwardRef(_Root)),
    Side: React.memo(React.forwardRef(_Side)),
};

export default Cylinder;
