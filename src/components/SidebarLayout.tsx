import React, { memo, useState } from 'react'
import SidebarLayoutContext from '../context/SidebarLayoutContext';

interface SidebarLayoutProps {
    children: React.ReactNode
    collapsedOffsetWidth?: number
    collapseMode?: "icon" | "hidden"
}

const SidebarLayout : React.FC<SidebarLayoutProps> = ({collapsedOffsetWidth, collapseMode="icon", children}) => {
    // const collapsedWidth = collapseMode === "icon" ? 64 : (collapsedOffsetWidth || 0)
    const collapsedWidth = collapsedOffsetWidth || (collapseMode === "icon" ? 64 : 0)
    return (
        <SidebarLayoutContext.Provider
            value={{
                collapsedWidth,
                collapseMode,
            }}
        >
            {children}
        </SidebarLayoutContext.Provider>
    )
}

export default memo(SidebarLayout)