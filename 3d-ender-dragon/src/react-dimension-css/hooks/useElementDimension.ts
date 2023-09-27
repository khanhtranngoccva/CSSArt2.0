import React from "react";

export interface ElementDimension {
    width: number;
    height: number;
}

export default function useElementDimension(ref: React.RefObject<HTMLElement>) {
    const [dimension, setDimension] = React.useState<ElementDimension>({
        width: 0,
        height: 0,
    });

    React.useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            setDimension({
                width: entry.contentRect.width,
                height: entry.contentRect.height,
            });
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, [ref]);

    return dimension;
}
