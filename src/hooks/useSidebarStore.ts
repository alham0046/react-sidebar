import { useContext } from "react";
import { SidebarStoreContext } from "../context/SharedContext";

export const useSidebarStore = () => {
  const ctx = useContext(SidebarStoreContext);
  if (!ctx) throw new Error("useSidebar must be used inside Sidebar");
  return ctx;
};