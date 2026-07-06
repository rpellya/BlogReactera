import { useEffect } from 'react';

/**
 * Is mode storybook?
 * To avoid creating unnecessary queries in the storybook
 * @param callback void
 *
 */
export function useInitialEffect(callback: () => void) {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
            callback();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
