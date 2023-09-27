"use client";

import React from "react";
export default function useMousedown(ref: React.RefObject<HTMLElement>) {
    const [mousedown, setMousedown] = React.useState<boolean>(false);

    React.useEffect(() => {
        const element = ref.current;
        if (!element) return;
        function handleMousedown() {
            setMousedown(true);
        }
        function handleMouseup() {
            setMousedown(false);
        }

        element.addEventListener("mousedown", handleMousedown);
        window.addEventListener("mouseup", handleMouseup);
        return () => {
            element.removeEventListener("mousedown", handleMousedown);
            window.removeEventListener("mouseup", handleMouseup);
        }
    }, [ref]);

    return mousedown;
}
