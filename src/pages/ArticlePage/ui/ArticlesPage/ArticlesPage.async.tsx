import { lazy } from 'react';

export const ArticlesPageAsync = lazy(
    () =>
        new Promise((resoleve) => {
            // @ts-ignore
            // FOR EXAMPLE WITH DEALY LOADING PAGE
            setTimeout(() => resoleve(import('./ArticlesPage')), 1000);
        }),
);
