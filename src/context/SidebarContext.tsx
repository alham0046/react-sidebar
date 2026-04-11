// SidebarContext.tsx
import React, { createContext, useContext } from "react"

interface SidebarContextType {
  collapsed: boolean
  toggle: () => void
  // collapseMode: "icon" | "hidden"
  collapsedOffsetWidth?: number
}

const SidebarContext = createContext<SidebarContextType | null>(null)

export const useSidebar = () => {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used inside Sidebar")
  return ctx
}

export default SidebarContext