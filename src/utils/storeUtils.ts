import { getOrCreateStore } from "@/store/storeRegistry";

export const highlightItem = (sidebarId: string, itemId: string) => {
    const store = getOrCreateStore(`main_${sidebarId}`);
    store.setActiveStyle(itemId);
}

export const sidebarAction = (sidebarId: string) => {
    const store = getOrCreateStore(`main_${sidebarId}`);
    return {
        highlightItem: (itemId: string) => store.setActiveStyle(itemId)
    }
}