import { createContext, type Context } from "react";
import type { SidebarStore } from "../store/store";

// unique global key
const GLOBAL_KEY = "__REACT_SIDEBAR_CONTEXT__";

// reuse if already exists (important for multi-bundle)
const globalAny = globalThis as any;

export const SidebarStoreContext : Context<SidebarStore | null> =
  globalAny[GLOBAL_KEY] ||
  (globalAny[GLOBAL_KEY] = createContext<SidebarStore | null>(null));