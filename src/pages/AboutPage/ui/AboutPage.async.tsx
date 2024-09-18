import { lazy } from 'react';

export const AboutPageAsync = lazy(() => import('./AboutPage'));

// Когда можно использовать
// 1. Страницы
// 2. Модалки/шторки/тултипы
// 3. Блоки, которые не попадают в экраны
