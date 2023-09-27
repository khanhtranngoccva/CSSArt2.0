import React from "react";

export function useCustomEventListener<E extends CustomEvent<D>, T extends HTMLElement=any, D=any>(ref: React.RefObject<T>, eventName: E["type"], callback?: (evt: E) => void) {
    React.useEffect(() => {
        const element = ref.current;
        if (!element || !callback) return;

        // @ts-ignore
        element.addEventListener(eventName, callback);
        // @ts-ignore
        return () => element.removeEventListener(eventName, callback);
    }, [ref, eventName, callback]);
}

export default function useEventListener<T extends HTMLElement=any>(ref: React.RefObject<T>, eventName: Event["type"], callback?: (evt: Event) => void) {
    React.useEffect(() => {
        const element = ref.current;
        if (!element || !callback) return;

        element.addEventListener(eventName, callback);
        return () => element.removeEventListener(eventName, callback);
    }, [ref, eventName, callback]);
}
