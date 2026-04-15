import { SidebarStore } from "./store"

const storeRegistry = new Map<string, SidebarStore>()

export const unregisterForm = (storeId: string) => {
  storeRegistry.delete(storeId)
}

export const getOrCreateStore = (storeId: string, defaultCollapsed: boolean = true) => {
  let store = storeRegistry.get(storeId)

  if (!store) {
    store = new SidebarStore(storeId, defaultCollapsed)
    storeRegistry.set(storeId, store)
  }

  return store
}