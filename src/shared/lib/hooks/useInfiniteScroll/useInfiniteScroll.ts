import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScrollProps {
    callback?: () => void; // crossed one or another element
    triggerRef: MutableRefObject<HTMLElement>; // crossed the element and call the callback function
    wrapperRef: MutableRefObject<HTMLElement>; // inside which is scrolling

}

export function useInfiniteScroll({ callback, triggerRef, wrapperRef }: UseInfiniteScrollProps) {
    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;
        if (callback) {
            const options = {
                root: wrapperElement, // the element in which the scroll is located
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.observe(triggerElement); // element we are monitoring
        }

        return () => {
            if (observer && triggerElement) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
