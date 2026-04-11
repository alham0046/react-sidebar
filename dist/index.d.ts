import * as React from 'react';
import React__default from 'react';

interface SidebarTextProps {
    children: React__default.ReactNode;
    className?: string;
    style?: React__default.CSSProperties;
}

interface SidebarIconProps {
    children: React__default.ReactNode;
    imageViewport?: string;
}

interface SidebarItemProps {
    children: React__default.ReactNode;
    onClick?: () => void;
    className?: string;
    style?: React__default.CSSProperties;
}

interface SidebarToggleProps {
    children: React__default.ReactNode;
    className?: string;
}

interface SideBarProps {
    children: React__default.ReactNode;
    defaultCollapsed?: boolean;
    expandedWidth?: number;
}

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

export { _default$1 as MainContent, Sidebar, _default as SidebarLayout };
