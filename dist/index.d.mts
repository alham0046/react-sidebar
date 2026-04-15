import * as React from 'react';
import React__default, { MouseEvent } from 'react';

interface SidebarTextProps {
    children: React__default.ReactNode;
    className?: string;
    style?: React__default.CSSProperties;
    onClick?: (item: string, e: MouseEvent<HTMLDivElement>) => void;
}

interface SidebarIconProps {
    children: React__default.ReactNode;
    imageViewport?: string;
    onClick?: (item: string, e: MouseEvent<HTMLDivElement>) => void;
}

interface SideBarProps {
    children: React__default.ReactNode;
    defaultCollapsed?: boolean;
    expandedWidth?: number;
    sidebarId?: string;
}
type Shortcut = {
    key: string;
    alt?: boolean;
    ctrl?: boolean;
    shift?: boolean;
    meta?: boolean;
    action?: () => void;
};

interface SidebarItemProps {
    children: React__default.ReactNode;
    onClick?: (item: string, e?: MouseEvent<HTMLDivElement>) => void;
    className?: string;
    itemGroup?: string;
    style?: React__default.CSSProperties;
    uniqueId?: string;
    imageViewport?: string;
    shortcut?: Shortcut;
    TwActiveStyles?: string;
    activeStyle?: React__default.CSSProperties;
}

interface SidebarToggleProps {
    children: React__default.ReactNode;
    className?: string;
}

interface HamburgerProps {
    size?: number;
    color?: string;
    onClick?: () => void;
}
declare const _default$2: React__default.NamedExoticComponent<HamburgerProps>;

declare const highlightItem: (sidebarId: string, itemId: string) => void;
declare const sidebarAction: (sidebarId: string) => {
    highlightItem: (itemId: string) => void;
};

interface MainContentProps {
    children: React__default.ReactNode;
    className?: string;
    style?: React__default.CSSProperties;
}
declare const _default$1: React__default.NamedExoticComponent<MainContentProps>;

interface SidebarLayoutProps {
    children: React__default.ReactNode;
    collapsedOffsetWidth?: number;
    collapseMode?: "icon" | "hidden";
}
declare const _default: React__default.NamedExoticComponent<SidebarLayoutProps>;

declare const Sidebar: React.NamedExoticComponent<SideBarProps> & {
    Toggle: React.NamedExoticComponent<SidebarToggleProps>;
    Item: React.NamedExoticComponent<SidebarItemProps>;
    Icon: React.NamedExoticComponent<SidebarIconProps>;
    Text: React.NamedExoticComponent<SidebarTextProps>;
};

export { _default$1 as MainContent, Sidebar, _default as SidebarLayout, _default$2 as ThreeLineSideBar, highlightItem, sidebarAction };
