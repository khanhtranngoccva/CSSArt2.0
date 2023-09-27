import React from "react";
import useMemoizedObject from "../hooks/useMemoizedObject";
import waitNextAnimationFrame from "../helpers/waitNextAnimationFrame";

export interface TouchPosition {
    x?: number,
    y?: number,
    dx: number,
    dy: number,
    flickX: number,
    flickY: number,
}

export default function useTouch(ref: React.RefObject<HTMLElement>, releaseFriction=200) {
    const [touchdown, setTouchdown] = React.useState(false);
    const [touchPosition, setTouchPosition] = React.useState<TouchPosition>(() => {
        return {x: 0, y: 0, dx: 0, dy: 0, flickX: 0, flickY: 0};
    });

    React.useEffect(() => {
        const element = ref.current;
        if (!element) return;

        function handleTouchstart(e: TouchEvent) {
            e.preventDefault();
            const elementRect = element!.getBoundingClientRect();
            const touch = e.touches[0];
            setTouchdown(true);
            setTouchPosition({
                x: touch.clientX - elementRect.left,
                y: touch.clientY - elementRect.top,
                dx: 0,
                dy: 0,
                flickX: 0,
                flickY: 0,
            });
        }

        function handleTouchmove(e: TouchEvent) {
            e.preventDefault();
            const elementRect = element!.getBoundingClientRect();
            const touch = e.touches[0];
            setTouchPosition((oldPosition) => {
                return {
                    x: touch.clientX - elementRect.left,
                    y: touch.clientY - elementRect.top,
                    dx: oldPosition.x !== undefined ? (touch.clientX - elementRect.left - oldPosition.x) : 0,
                    dy: oldPosition.y !== undefined ? (touch.clientY - elementRect.top - oldPosition.y) : 0,
                    flickX: 0,
                    flickY: 0,
                };
            });
        }

        function handleTouchend(e: TouchEvent) {
            e.preventDefault();
            setTouchdown(false);
            setTouchPosition((oldPosition) => {
                return {
                    ...oldPosition,
                    x: undefined,
                    y: undefined,
                    flickX: oldPosition.dx,
                    flickY: oldPosition.dy,
                };
            });
        }

        element.addEventListener("touchstart", handleTouchstart);
        element.addEventListener("touchmove", handleTouchmove);
        element.addEventListener("touchend", handleTouchend);
        return () => {
            element.removeEventListener("touchstart", handleTouchstart);
            element.removeEventListener("touchmove", handleTouchmove);
            element.removeEventListener("touchend", handleTouchend);
        };
    }, [ref]);

    // Inertia scroll effect.
    React.useEffect(() => {
        if (touchdown) return;

        let brokenLoop = false;
        async function loop() {
            while (!brokenLoop) {
                const duration = await waitNextAnimationFrame();

                setTouchPosition((oldPosition) => {
                    const {flickX: oldFlickX, flickY: oldFlickY} = oldPosition;

                    if (oldFlickX === 0 && oldFlickY === 0) return oldPosition;
                    const diagonalVelocity = Math.sqrt(oldFlickX ** 2 + oldFlickY ** 2);

                    let reducedDiagonalVelocity = diagonalVelocity - releaseFriction * duration / 1000;
                    if (reducedDiagonalVelocity < 0) reducedDiagonalVelocity = 0;

                    const newFlickX = oldFlickX * reducedDiagonalVelocity / diagonalVelocity;
                    const newFlickY = oldFlickY * reducedDiagonalVelocity / diagonalVelocity;

                    return {
                        ...oldPosition,
                        flickX: newFlickX,
                        flickY: newFlickY,
                    }
                })
            }
        }

        loop().then();

        return () => {
            brokenLoop = true;
        }
    }, [releaseFriction, touchdown]);

    return useMemoizedObject({
        touchdown: touchdown,
        touchPosition: touchPosition,
    });
}
