import { VFC, SVGProps } from 'react';

export interface SidebarItemsListType {
    path: string;
    text: string;
    Icon: VFC<SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}
