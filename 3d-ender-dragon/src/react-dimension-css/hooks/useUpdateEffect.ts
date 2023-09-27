import React from "react";

export default function useUpdateEffect(effect: React.EffectCallback, deps?: React.DependencyList) {
    const isInitialMount = React.useRef(true);

    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            return effect();
        }
    }, deps);
}
