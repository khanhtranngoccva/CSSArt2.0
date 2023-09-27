import React from "react";

export interface MousePosition {
    x: number,
    y: number,
    dx: number,
    dy: number,
}

export default function useMousePosition(ref: React.RefObject<HTMLElement>) {
    const [mousePosition, setMousePosition] = React.useState<MousePosition>(() => {
        return {x: 0, y: 0, dx: 0, dy: 0};
    });

    React.useEffect(() => {
        const element = ref.current;
        if (!element) return;

        function handleMouseMove(e: MouseEvent) {
            setMousePosition(oldPosition => {
                const elementRect = element!.getBoundingClientRect();
                return {
                    x: e.clientX - elementRect.left,
                    y: e.clientY - elementRect.top,
                    dx: e.clientX - elementRect.left - oldPosition.x,
                    dy: e.clientY - elementRect.top - oldPosition.y,
                };
            });
        }

        element.addEventListener("mousemove", handleMouseMove);
        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
        }
    }, [ref]);

    return mousePosition;
}
