import { useCallback, useRef } from 'react';

export function useThrottle<T>(
    callBack: (...args: T[]) => void,
    delay: number,
) {
    const throttleRef = useRef(false);
    return useCallback(
        (...args: T[]) => {
            if (throttleRef.current) {
                return;
            }
            throttleRef.current = true;
            callBack(...args);
            setTimeout(() => {
                throttleRef.current = false;
            }, delay);
        },
        [callBack, delay],
    );
}
