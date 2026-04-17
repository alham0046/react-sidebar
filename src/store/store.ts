import type { Shortcut } from "../components/SideBar"
import { getKeyCombo } from "../utils/generateKey";

export interface StyleEntry {
    className?: string;
    classList?: string[];
    style?: React.CSSProperties;
    styleKeys?: string[];
}

export type OnSelectHandler = (route: string) => void;

type Listener = () => void

export class SidebarStore {
    private collapsed: boolean
    private storeId: string
    constructor(storeId: string, defaultCollapsed: boolean = true) {
        this.storeId = storeId
        this.collapsed = defaultCollapsed
    }
    private routing = false
    private navigate: any
    private route = new Map<string, string>()    ////// route -> id, route_path
    private routeInverse = new Map<string, string>() ////// route path -> id
    private pending = new Map<'id' | 'path', string>() ///// (id, path)
    private shortcuts = new Map<string, Shortcut>();
    private listeners = new Map<string, Set<Listener>>()
    subscribe(key: string, listener: Listener) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set())
        }
        this.listeners.get(key)!.add(listener)
        return () => {
            this.listeners.get(key)?.delete(listener)
        }
    }
    notify(key: string) {
        this.listeners.get(key)?.forEach(l => l())
    }
    toggle = () => {
        this.collapsed = !this.collapsed
        this.notify("collapsed")
    }

    setRouting(routing: boolean) {
        this.routing = routing
    }

    getShortcuts() {
        return Array.from(this.shortcuts)
    }

    registerNavigator(navigate: any) {
        this.navigate = navigate
    }

    setPendingPath(path: string) {
        this.pending.set("path", path)
    }

    setStyleViaPath(path: string) {
        if (!this.routing) return
        const id = this.routeInverse.get(path)
        if (!id) {
            this.setPendingPath(path)
            return
        }
        this.setActiveStyle(id)
    }

    navigateTo(path: string) {
        if (!this.routing) return
        this.navigate(path)
    }

    registerRoutes(id: string, route: string) {
        if (!this.route.has(id)) {
            this.route.set(id, route)
            this.routeInverse.set(route, id)
        }
        return () => {
            this.route.delete(id)
            this.routeInverse.delete(route)
        }
    }

    registerKey(shortcut: Shortcut) {
        const key = getKeyCombo(shortcut);


        if (!this.shortcuts.has(key)) {
            this.shortcuts.set(key, shortcut);
        }
        // this.shortcuts.set(key, shortcut);

        return () => {
            this.shortcuts.delete(key);
        };
    }

    getShortcut(key: string) {
        return this.shortcuts.get(key);
    }
    getSnapshot() {
        return this.collapsed
    }
    private elements = new Map<string, HTMLElement>()     /////// element -> id, element
    private styles = new Map<string, StyleEntry>()   ////// styles -> id, { className, style }
    private activeId: string | null = null;
    registerElement = (id: string, el: HTMLElement) => {
        this.elements.set(id, el);
        return () => {
            this.elements.delete(id);
        };
    }

    registerStyle = (id: string, style: Omit<StyleEntry, "styleKeys" | "classList">) => {
        const styleKeys = Object.keys(style.style || {})
        const classList = style.className ? style.className?.split(" ") : []
        this.styles.set(id, { ...style, styleKeys, classList });
        const path = this.route.get(id)
        if (path === this.pending.get("path")) {
            this.setActiveStyle(id)
            this.pending.delete("path")
        }

        return () => {
            this.styles.delete(id);
        };
    }

    setClickAction(id: string) {
        // const prevId = this.activeId
        this.setActiveStyle(id)
        const route = this.route.get(id)
        this.triggerSelect(route || "")
        if (!route) return
        this.navigateTo(route)
    }

    setActiveStyle(id: string) {
        if (id === this.activeId) return
        const style = this.styles.get(id);
        if (!style) return;
        const prevId = this.activeId


        if (prevId) {
            const prevStyle = this.styles.get(prevId);
            const prevElement = this.elements.get(prevId);
            if (prevElement && prevStyle) {
                if (prevStyle.classList?.length) {
                    prevElement?.classList.remove(...prevStyle.classList);
                }
                const prevStyleKeys = prevStyle.styleKeys
                if (prevElement && prevStyleKeys?.length) {
                    for (let i = 0; i < prevStyleKeys.length; i++) {
                        const key = prevStyleKeys[i];
                        (prevElement.style as any)[key] = "";
                    }
                }
            }
        }

        this.activeId = id;
        const element = this.elements.get(id);
        if (!element) return
        if (style.classList?.length) {
            element.classList.add(...style.classList);
        }
        const styleKeys = style.styleKeys
        if (styleKeys?.length) {
            const styleObj = style.style!;
            for (let i = 0; i < styleKeys.length; i++) {
                const key = styleKeys[i];
                (element.style as any)[key] = (styleObj as any)[key];
            }
        }
    }

    private onSelect?: OnSelectHandler;

    // 👉 register handler
    setOnSelect(handler?: OnSelectHandler) {
        this.onSelect = handler;
    }

    // 👉 trigger from item
    triggerSelect(value: string) {
        this.onSelect?.(value);
    }
}
// import type { Shortcut } from "../components/SideBar"
// import { getKeyCombo } from "../utils/generateKey";

// export interface StyleEntry {
//     className?: string;
//     classList?: string[];
//     style?: React.CSSProperties;
//     styleKeys?: string[];
// }

// type Listener = () => void

// export class SidebarStore {
//     private collapsed: boolean
//     private storeId: string
//     constructor(storeId: string, defaultCollapsed: boolean = true) {
//         this.storeId = storeId
//         this.collapsed = defaultCollapsed
//     }
//     // private shortcuts = new Set<Shortcut>()
//     private shortcuts = new Map<string, Shortcut>();
//     private listeners = new Map<string, Set<Listener>>()
//     subscribe(key: string, listener: Listener) {
//         if (!this.listeners.has(key)) {
//             this.listeners.set(key, new Set())
//         }
//         this.listeners.get(key)!.add(listener)
//         return () => {
//             this.listeners.get(key)?.delete(listener)
//         }
//     }
//     notify(key: string) {
//         this.listeners.get(key)?.forEach(l => l())
//     }
//     toggle = () => {
//         this.collapsed = !this.collapsed
//         this.notify("collapsed")
//     }

//     getShortcuts() {
//         return Array.from(this.shortcuts)
//     }

//     // registerKey(key: Shortcut) {
//     //     console.log(key, this.collapsed)
//     //     this.shortcuts.add(key)
//     //     return () => {
//     //         this.shortcuts.delete(key)
//     //     }
//     // }
//     registerKey(shortcut: Shortcut) {
//         const key = getKeyCombo(shortcut);

//         console.log(key);

//         this.shortcuts.set(key, shortcut);

//         return () => {
//             this.shortcuts.delete(key);
//         };
//     }

//     getShortcut(key: string) {
//         return this.shortcuts.get(key);
//     }
//     getSnapshot() {
//         return this.collapsed
//     }
//     private elements = new Map<string, HTMLElement>()     /////// element -> id, element
//     private styles = new Map<string, StyleEntry>()   ////// styles -> id, { className, style }
//     private activeId: string | null = null;
//     registerElement = (id: string, el: HTMLElement) => {
//         this.elements.set(id, el);
//         return () => {
//             this.elements.delete(id);
//         };
//     }

//     registerStyle = (id: string, style: Omit<StyleEntry, "styleKeys" | "classList">) => {
//         const styleKeys = Object.keys(style.style || {})
//         const classList = style.className ? style.className?.split(" ") : []
//         // console.log(style, classList)
//         this.styles.set(id, { ...style, styleKeys, classList });

//         return () => {
//             this.styles.delete(id);
//         };
//     }

//     setActiveStyle(id: string) {
//         if (id === this.activeId) return
//         const style = this.styles.get(id);
//         if (!style) return;

//         const prevId = this.activeId


//         if (prevId) {
//             const prevStyle = this.styles.get(prevId);
//             const prevElement = this.elements.get(prevId);
//             if (prevElement && prevStyle) {
//                 if (prevStyle.classList?.length) {
//                     prevElement?.classList.remove(...prevStyle.classList);
//                 }
//                 const prevStyleKeys = prevStyle.styleKeys
//                 if (prevElement && prevStyleKeys?.length) {
//                     for (let i = 0; i < prevStyleKeys.length; i++) {
//                         const key = prevStyleKeys[i];
//                         (prevElement.style as any)[key] = "";
//                     }
//                 }
//             }
//         }

//         this.activeId = id;
//         const element = this.elements.get(id);
//         if (!element) return
//         if (style.classList?.length) {
//             console.log(style.classList)
//             element.classList.add(...style.classList);
//         }
//         const styleKeys = style.styleKeys
//         if (styleKeys?.length) {
//             const styleObj = style.style!;
//             for (let i = 0; i < styleKeys.length; i++) {
//                 const key = styleKeys[i];
//                 (element.style as any)[key] = (styleObj as any)[key];
//             }
//         }
//     }
// }