// import React, { memo } from "react";

// export interface SidebarIconProps {
//   children: React.ReactNode;
//   imageViewport?: string;
// }

// const SidebarIcon: React.FC<SidebarIconProps> = ({ children, imageViewport = "24 24" }) => {
//   const [width, height] = imageViewport.split(" ");

//   return (
//     <div
//       // className="flex-shrink-0 flex items-center justify-center"
//       style={{ width, height }}
//       className={`rs-sidebarIcon border`}
//     >
//       {children}
//     </div>
//   );
// };

// export default memo(SidebarIcon);

import React, { memo, useCallback, type MouseEvent } from "react";
import { useSidebarLayout } from "../context/SidebarLayoutContext";
import { useItemContext } from "@/context/SidebarItemContext";

export interface SidebarIconProps {
  children: React.ReactNode;
  imageViewport?: string;
  onClick?: (item : string, e : MouseEvent<HTMLDivElement>) => void
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ children, imageViewport, onClick }) => {
  const { sharedImageViewport, itemGroup } = useItemContext()
  const { collapsedWidth } = useSidebarLayout()
  const [width, height] = (imageViewport || sharedImageViewport).split(" ");

  const handleClick = useCallback((e : MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(itemGroup, e)
    }
  }, [onClick, itemGroup])

  return (
    <div
      style={{
        width: collapsedWidth, // 🔥 anchor width
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <div
        // className="flex-shrink-0 flex items-center justify-center"
        style={{ width: `${width}px`, height: `${height}px` }}
        className={`rs-sidebarIcon`}
        onClick={handleClick}
      >
        {children}
      </div>
    </div>
  );
};

export default memo(SidebarIcon);