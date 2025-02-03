import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import HomeIcon from 'shared/assets/icons/home.svg';
import PeopleIcon from 'shared/assets/icons/people.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticleIcon from 'shared/assets/icons/article.svg';
import { SidebarItemsListType } from '../types/sidebar';

export const getSiderbarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemsList: SidebarItemsListType[] = [
        {
            path: RoutePath.main,
            Icon: HomeIcon,
            text: 'Main',
        },
        {
            path: RoutePath.about,
            Icon: PeopleIcon,
            text: 'About us',
        },
    ];
    if (userData) {
        sidebarItemsList.push(
            {
                path: RoutePath.profile + userData.id,
                Icon: ProfileIcon,
                text: 'Profile',
                authOnly: true,
            },
            {
                path: RoutePath.articles,
                Icon: ArticleIcon,
                text: 'Arictles',
                authOnly: true,
            },
        );
    }

    return sidebarItemsList;
});
