// SidebarContext.tsx
import React, { createContext, useContext } from "react"

interface SidebarLayoutContextType {
  // collapsedOffsetWidth?: number
  collapsedWidth?: number
  collapseMode?: "icon" | "hidden"
}

const SidebarLayoutContext = createContext<SidebarLayoutContextType | null>(null)

export const useSidebarLayout = () => {
  const ctx = useContext(SidebarLayoutContext)
  if (!ctx) throw new Error("useSidebar must be used inside Sidebar")
  return ctx
}

export default SidebarLayoutContext