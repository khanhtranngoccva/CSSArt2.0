import React, {ComponentProps, CSSProperties} from "react";
import classes from "./styles.module.css"

export interface RootProps extends ComponentProps<"div"> {
    className?: string;
    children?: React.ReactNode;
    width?: string; // z-dimension
    height?: string; // height-dimension
    length?: string; // width-dimension
    x?: string;
    y?: string;
    z?: string;
    style?: CSSProperties;
}

export interface SideProps extends ComponentProps<"div"> {
    children?: React.ReactNode;
    className?: string;
    background?: string;
}

function Root(props: RootProps, ref: React.ForwardedRef<HTMLDivElement>) {
    return <div {...props} ref={ref} className={`${classes.root} ${props.className ?? ''}`} style={{
        "--width": props.width,
        "--height": props.height,
        "--length": props.length,
        "--x": props.x,
        "--y": props.y,
        "--z": props.z,
        ...props.style,
    } as CSSProperties}>
        {props.children}
    </div>
}

function _Side(props: SideProps, ref: React.ForwardedRef<HTMLDivElement>) {
    return <div {...props} className={`${classes.side} ${props.className ?? ''}`} style={{
        background: props.background,
        ...props.style
    }} ref={ref}>
        {props.children}
    </div>
}

const Side = React.memo(React.forwardRef(_Side));


function Top(props: SideProps, ref: React.ForwardedRef<HTMLDivElement>) {
    return <Side {...props} className={`${classes.top} ${props.className ?? ''}`} style={{
        background: props.background,
        ...props.style
    }} ref={ref}/>;
}

function Bottom(props: SideProps, ref: React.ForwardedRef<HTMLDivElement>) {
    return <Side {...props} className={`${classes.bottom} ${props.className ?? ''}`} style={{
        background: props.background,
        ...props.style
    }} ref={ref}/>;
}

function Front(props: SideProps, ref: React.ForwardedRef<HTMLDivElement>) {
    return <Side {...props} className={`${classes.front} ${props.className ?? ''}`} style={{
        background: props.background,
        ...props.style
    }} ref={ref}/>;
}

function Back(props: SideProps, ref: React.ForwardedRef<HTMLDivElement>) {
    return <Side {...props} className={`${classes.back} ${props.className ?? ''}`} style={{
        background: props.background,
        ...props.style
    }} ref={ref}/>;

}

function Left(props: SideProps, ref: React.Ref<HTMLDivElement>) {
    return <Side {...props} className={`${classes.left} ${props.className ?? ''}`} style={{
        background: props.background,
        ...props.style
    }} ref={ref}/>;
}

function Right(props: SideProps, ref: React.Ref<HTMLDivElement>) {
    return <Side {...props} className={`${classes.right} ${props.className ?? ''}`} style={{
        background: props.background,
        ...props.style
    }} ref={ref}/>;
}

const Box = {
    Root: React.memo(React.forwardRef(Root)),
    Left: React.memo(React.forwardRef(Left)),
    Right: React.memo(React.forwardRef(Right)),
    Top: React.memo(React.forwardRef(Top)),
    Bottom: React.memo(React.forwardRef(Bottom)),
    Front: React.memo(React.forwardRef(Front)),
    Back: React.memo(React.forwardRef(Back)),
};

export default Box;
