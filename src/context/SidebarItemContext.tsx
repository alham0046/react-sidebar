import { createContext, useContext } from "react";

interface SidebarItemContextType {
    sharedImageViewport: string;
    routeName : string;
    routePath : string;
}

const SidebarItemContext = createContext<SidebarItemContextType | null>(null);

export const useItemContext = () => {
    const ctx = useContext(SidebarItemContext);
    if (!ctx) throw new Error("useItemContext must be used inside Sidebar")
    return ctx
};

export default SidebarItemContext