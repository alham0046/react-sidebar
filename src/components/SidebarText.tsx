import React, { memo, useCallback, type MouseEvent } from "react";
import { motion } from "motion/react";
import { useSidebarLayout } from "../context/SidebarLayoutContext";
import { useItemContext } from "../context/SidebarItemContext";
import { useSidebarCollapsed } from "@/hooks/useSidebar";

export interface SidebarTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (item : string, e : MouseEvent<HTMLDivElement>) => void
}

const SidebarText: React.FC<SidebarTextProps> = ({
  children,
  className = "",
  style = {},
  onClick
}) => {
  const collapsed = useSidebarCollapsed();
  const { collapseMode } = useSidebarLayout();
  const { itemGroup } = useItemContext();

  const showText =
    collapseMode === "hidden"
      ? true
      : !collapsed;

  const handleClick = useCallback((e : MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(itemGroup, e)
    }
  }, [onClick, itemGroup])
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: showText ? 1 : 0,
        x: showText ? 0 : -8,
        width: showText ? "auto" : 0,
      }}
      transition={{
        duration: 0.2
      }}
      className={`rs-sidebarText ${className}`}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        ...style
      }}
      onClick={handleClick}
    >
      {children}
    </motion.div>
  );
};

export default memo(SidebarText);







// import React, { memo } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { useSidebar } from "../context/SidebarContext";
// import { useSidebarLayout } from "../context/SidebarLayoutContext";

// export interface SidebarTextProps {
//   children: React.ReactNode;
//   className?: string;
//   style?: React.CSSProperties;
// }

// const SidebarText: React.FC<SidebarTextProps> = ({
//   children,
//   className = "",
//   style = {},
// }) => {
//   const { collapsed } = useSidebar();
//   const { collapseMode } = useSidebarLayout();

//   const showText =
//     collapseMode === "hidden"
//       ? true
//       : !collapsed;

//   return (
//     <motion.div
//       initial={false}
//       animate={{
//         opacity: showText ? 1 : 0,
//         x: showText ? 0 : -8,
//         width: showText ? "auto" : 0,
//       }}
//       transition={{
//         duration: 0.2
//       }}
//       className={`rs-sidebarText ${className}`}
//       style={{
//         overflow: "hidden",
//         whiteSpace: "nowrap",
//         ...style
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default memo(SidebarText);




// import React, { memo } from "react";
// import { useSidebar } from "./SidebarContext";
// import { useSidebarLayout } from "./SidebarLayoutContext";
// import styles from "./Sidebar.module.css";


// interface SidebarTextProps {
//   children: React.ReactNode;
//   className?: string;
//   style?: React.CSSProperties
// }

// const SidebarText: React.FC<SidebarTextProps> = ({
//   children,
//   className = "",
//   style = {},
// }) => {
//   const { collapsed } = useSidebar();

//   const { collapseMode } = useSidebarLayout();

//   const showText =
//     collapseMode === "hidden"
//       ? true
//       : !collapsed;

//   if (!showText) return null;

//   return (
//     <div
//       // className={`whitespace-nowrap ${className}`}
//       className={`${styles.sidebarText} ${className}`}
//       style={style}
//     >
//       {children}
//     </div>
//   );
// };

// export default memo(SidebarText);







// import { memo } from "react"
// import { useSidebar } from "./SidebarContext"

// interface SidebarTextProps {
//     children: React.ReactNode
// }
// const SidebarText : React.FC<SidebarTextProps> = ({ children }) => {
//   const { collapsed } = useSidebar()

//   if (collapsed) return null

//   return <span>{children}</span>
// }

// export default memo(SidebarText)