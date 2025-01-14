import { SVGProps, VFC } from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import HomeIcon from 'shared/assets/icons/home.svg';
import PeopleIcon from 'shared/assets/icons/people.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticleIcon from 'shared/assets/icons/article.svg';

export interface SidebarItemsListType {
    path: string;
    text: string;
    Icon: VFC<SVGProps<SVGSVGElement>>
    authOnly?: boolean;
}
export const SidebarItemsList: SidebarItemsListType[] = [
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
    {
        path: RoutePath.profile,
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
];
