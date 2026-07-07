import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

// createSelector - мемоизирует получение список ролей и проверку на Админа, чтобы каждый раз по массиву ролей не пробегать
export const isUserAdmin = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes('ADMIN')),
);
export const isUserManager = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes('MANAGER')),
);
