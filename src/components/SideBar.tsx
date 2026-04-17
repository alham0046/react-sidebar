import React, { memo, useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { useSidebarLayout } from '../context/SidebarLayoutContext'
import { motion } from 'motion/react'
import { getKeyCombo } from '@/utils/generateKey'
import { getOrCreateStore } from '@/store/storeRegistry'
import { randomString } from '@/utils/stringManiputation'
import { SidebarStore } from '@/store/store'
import SidebarStoreContext from '../context/SidebarContext'

export interface SideBarProps {
  children: React.ReactNode
  defaultCollapsed?: boolean
  routing?: boolean
  sidebarId?: string
  expandedWidth?: number
  onSelect?: (item: string) => void
}

export type Shortcut = {
  key: string;
  alt?: boolean;
  ctrl?: boolean;
  shift?: boolean;
  meta?: boolean;
  action?: () => void;
};

const SidebarRoot: React.FC<SideBarProps> = ({ children, sidebarId,onSelect, routing = false, defaultCollapsed = true, expandedWidth = 250 }) => {
  const storeRef = useRef<SidebarStore>(null);


  if (!storeRef.current) {
    const storeId = `main_${sidebarId || randomString()}`
    storeRef.current = getOrCreateStore(storeId, defaultCollapsed)
    storeRef.current?.setRouting(routing)
    storeRef.current!.setOnSelect(onSelect);
  }

  const subscribeCollapsed = useCallback(
    (cb: () => void) => storeRef.current!.subscribe("collapsed", cb),
    []
  );

  const collapsed = useSyncExternalStore(
    subscribeCollapsed,
    () => storeRef.current!.getSnapshot(),
  );
  const { collapsedWidth } = useSidebarLayout()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const tag = (e.target as HTMLElement).tagName;

      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        (e.target as HTMLElement).isContentEditable
      ) return;


      const key = getKeyCombo({
        key: e.key,
        ctrl: e.ctrlKey,
        alt: e.altKey,
        shift: e.shiftKey,
        meta: e.metaKey
      });

      const shortcut = storeRef.current!.getShortcut(key);

      // console.log(key)

      if (shortcut) {
        e.preventDefault();
        shortcut.action?.();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // const width = collapsed ? collapsedWidth : expandedWidth
  const width = collapsed
    ? Number(collapsedWidth)
    : Number(expandedWidth)

  // const isHidden = collapseMode === "hidden" && collapsed
  return (
    <SidebarStoreContext.Provider
      value={storeRef.current}
    >
      <div className={"rs-sidebarRootOuter"}>
        <motion.div
          initial={false}
          animate={{ width }}
          // transition={{ duration: 0.3, ease: "easeInOut" }}
          transition={{
            duration: 0.28,
            ease: [0.4, 0, 0.2, 1]
          }}
          className={"rs-sidebarRootMiddle"}
        // style={{ width }}
        >
          <div className={"rs-sidebarRootInner"}>
            {children}
          </div>
        </motion.div>
      </div>
    </SidebarStoreContext.Provider>
  )
}

export default memo(SidebarRoot)







// import React, { memo, useState } from 'react'
// import SidebarContext from '../context/SidebarContext'
// import { useSidebarLayout } from '../context/SidebarLayoutContext'
// import { motion } from 'motion/react'

// export interface SideBarProps {
//   children: React.ReactNode
//   defaultCollapsed?: boolean
//   expandedWidth?: number
// }

// const SidebarRoot: React.FC<SideBarProps> = ({ children, defaultCollapsed = true, expandedWidth = 250 }) => {
//   const [collapsed, setCollapsed] = useState(defaultCollapsed)

//   const toggle = () => setCollapsed(prev => !prev)

//   const { collapsedWidth } = useSidebarLayout()

//   // const width = collapsed ? collapsedWidth : expandedWidth
//   const width = collapsed
//     ? Number(collapsedWidth)
//     : Number(expandedWidth)

//   // const isHidden = collapseMode === "hidden" && collapsed
//   return (
//     <SidebarContext.Provider
//       value={{
//         collapsed,
//         toggle,
//       }}
//     >
//       <div className={"rs-sidebarRootOuter"}>
//         <motion.div
//           initial={false}
//           animate={{ width }}
//           // transition={{ duration: 0.3, ease: "easeInOut" }}
//           transition={{
//             duration: 0.28,
//             ease: [0.4, 0, 0.2, 1]
//           }}
//           className={"rs-sidebarRootMiddle"}
//         // style={{ width }}
//         >
//           <div className={"rs-sidebarRootInner"}>
//             {children}
//           </div>
//         </motion.div>
//       </div>
//     </SidebarContext.Provider>
//   )
// }

// export default memo(SidebarRoot)