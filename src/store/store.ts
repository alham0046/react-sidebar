import type { Shortcut } from "../components/SideBar"
import { getKeyCombo } from "../utils/generateKey";

export interface StyleEntry {
    className?: string;
    classList?: string[];
    style?: React.CSSProperties;
    styleKeys?: string[];
}

type Listener = () => void

export class SidebarStore {
    private collapsed: boolean
    private storeId: string
    constructor(storeId: string, defaultCollapsed: boolean = true) {
        this.storeId = storeId
        this.collapsed = defaultCollapsed
    }
    // private shortcuts = new Set<Shortcut>()
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

    getShortcuts() {
        return Array.from(this.shortcuts)
    }

    // registerKey(key: Shortcut) {
    //     console.log(key, this.collapsed)
    //     this.shortcuts.add(key)
    //     return () => {
    //         this.shortcuts.delete(key)
    //     }
    // }
    registerKey(shortcut: Shortcut) {
        const key = getKeyCombo(shortcut);

        console.log(key);

        this.shortcuts.set(key, shortcut);

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
        // console.log(style, classList)
        this.styles.set(id, { ...style, styleKeys, classList });

        return () => {
            this.styles.delete(id);
        };
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
            console.log(style.classList)
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
}

// export const sidebarStore = new SidebarStore();

// setActiveElement(
    //     el: HTMLElement,
    //     config?: {
    //         className?: string;
    //         style?: React.CSSProperties;
    //     }
    // ) {
    //     if (this.activeItem === el) return;

    //     // 🔥 Remove previous styles
    //     if (this.activeItem) {
    //         this.activeItem.removeAttribute("data-active");

    //         const prevClass = this.activeItem.dataset.activeClass;
    //         if (prevClass) {
    //             this.activeItem.classList.remove(...prevClass.split(" "));
    //         }

    //         const prevStyle = this.activeItem.dataset.activeStyle;
    //         if (prevStyle) {
    //             const parsed = JSON.parse(prevStyle);
    //             Object.keys(parsed).forEach((key) => {
    //                 (this.activeItem!.style as any)[key] = "";
    //             });
    //         }
    //     }

    //     // 🔥 Set new active
    //     this.activeItem = el;
    //     el.setAttribute("data-active", "true");

    //     // ✅ Apply class
    //     if (config?.className) {
    //         el.classList.add(...config.className.split(" "));
    //         el.dataset.activeClass = config.className;
    //     }

    //     // ✅ Apply inline styles
    //     if (config?.style) {
    //         Object.entries(config.style).forEach(([key, value]) => {
    //             (el.style as any)[key] = value;
    //         });

    //         el.dataset.activeStyle = JSON.stringify(config.style);
    //     }
    // }