// import React, { memo } from "react";
// import { useSidebar } from "../context/SidebarContext";

// export interface SidebarToggleProps {
//   children: React.ReactNode;
//   className?: string;
// }

// const SidebarToggle: React.FC<SidebarToggleProps> = ({ children, className = "" }) => {
//   const { toggle } = useSidebar();

//   return (
//     <div
//       onClick={toggle}
//       className={`rs-sidebarToggle ${className}`}
//     >
//       {children}
//     </div>
//   );
// };

// export default memo(SidebarToggle);


import React, { memo } from "react";
import { useSidebarLayout } from "../context/SidebarLayoutContext";
import { useSidebarActions } from "../hooks/useSidebar";

export interface SidebarToggleProps {
  children: React.ReactNode;
  className?: string;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ children, className = "" }) => {
  const { toggle } = useSidebarActions();
  const { collapsedWidth, collapseMode } = useSidebarLayout();

  return (
    <div style={{
      width: collapseMode === 'icon' ? collapsedWidth : undefined, // 🔥 anchor width
      display: "flex",
      position : collapseMode === 'icon' ? 'relative' : 'absolute',
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
    }}>
      <div
        onClick={toggle}
        className={`rs-sidebarToggle ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default memo(SidebarToggle);