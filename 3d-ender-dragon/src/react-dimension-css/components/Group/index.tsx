import React, {ComponentProps} from "react";
import classes from './styles.module.css';

export interface GroupProps extends ComponentProps<"div"> {
    x?: string;
    y?: string;
    z?: string;
}

function _Group(props: GroupProps, ref: React.ForwardedRef<HTMLDivElement>) {
    const {x, y, z, ...delegated} = props;

    return <div {...delegated} ref={ref} className={`${classes.group} ${props.className ?? ''}`} style={{
        "--x": x,
        "--y": y,
        "--z": z,
        ...props.style,
    } as React.CSSProperties}>
        {props.children}
    </div>
}

const Group = React.memo(React.forwardRef(_Group));
export default Group;
