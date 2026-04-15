// SidebarContext.tsx
import { createContext, useContext } from "react"
import type { SidebarStore } from "../store/store";

const SidebarStoreContext = createContext<SidebarStore | null>(null)

// export const SidebarStateContext = createContext<SidebarStore['collapsed'] | null>(null)

export const useSidebarStore = () => {
  const ctx = useContext(SidebarStoreContext)
  if (!ctx) throw new Error("useSidebar must be used inside Sidebar")
  return ctx
}

export default SidebarStoreContext
// // SidebarContext.tsx
// import React, { createContext, useContext } from "react"

// interface SidebarContextType {
//   collapsed: boolean
//   toggle: () => void
//   // collapseMode: "icon" | "hidden"
//   collapsedOffsetWidth?: number
// }

// const SidebarContext = createContext<SidebarContextType | null>(null)

// export const useSidebar = () => {
//   const ctx = useContext(SidebarContext)
//   if (!ctx) throw new Error("useSidebar must be used inside Sidebar")
//   return ctx
// }

// export default SidebarContext