// useSidebar.ts
import { useMemo, useSyncExternalStore } from "react";
import { useSidebarStore } from "../context/SidebarContext";
import type { Shortcut } from "../components/SideBar";
import type { StyleEntry } from "../store/store";

export const useSidebarCollapsed = () => {
  const store = useSidebarStore();

  return useSyncExternalStore(
    (cb) => store.subscribe("collapsed", cb),
    () => store.getSnapshot()
  );
};

export const useSidebarActions = () => {
  const store = useSidebarStore();

  return useMemo(() => ({
    toggle: store.toggle,
    registerKey: (key: Shortcut) => store.registerKey(key),
    setActiveStyle: (id: string) => store.setActiveStyle(id),
    registerElement: (id: string, el: HTMLElement) => store.registerElement(id, el),
    registerStyle: (id: string, style: Omit<StyleEntry, "styleKeys">) => store.registerStyle(id, style),
    triggerSelect: (value: string) => store.triggerSelect(value),
    registerNavigate: (navigate: any) => store.registerNavigator(navigate),
    onItemClick: (id: string) => store.setClickAction(id),
    registerRoute: (id: string, route: string) => store.registerRoutes(id, route),
    setStyleViaPath: (path: string) => store.setStyleViaPath(path),
  }), [store]);
};
// export const useSidebarActions = () => {
//   const store = useSidebarStore();

//   return {
//     toggle: store.toggle,
//     registerKey : (key: Shortcut) => store.registerKey(key),
//     // setActiveElement: (el: HTMLElement, { className, style }: { className?: string; style?: React.CSSProperties }) => store.setActiveElement(el, { className, style }),
//     setActiveStyle: (id: string) => store.setActiveStyle(id),
//     register : (id: string, el: HTMLElement, style: StyleEntry) => {
//         store.registerElement(id, el);
//         store.registerStyle(id, style);
//     },
//     registerElement: (id: string, el: HTMLElement) => store.registerElement(id, el),
//     registerStyle: (id: string, style: Omit<StyleEntry, "styleKeys">) => store.registerStyle(id, style),
//   };
// };

///// Use the below selector code if you have more states to manage(but i have currently one state)

// export const useSidebarSelector = <T,>(
//   selector: (state: { collapsed: boolean }) => T
// ) => {
//   const store = useSidebarStore();

//   return useSyncExternalStore(
//     (cb) => store.subscribe("collapsed", cb),
//     () => selector({ collapsed: store.getSnapshot() })
//   );
// };

// const collapsed = useSidebarSelector(s => s.collapsed);