// import React, { memo } from "react";

// export interface SidebarItemProps {
//   children: React.ReactNode;
//   onClick?: () => void;
//   className?: string;
//   style?: React.CSSProperties
// }

// const SidebarItem: React.FC<SidebarItemProps> = ({
//   children,
//   onClick,
//   className = "",
//   style = {},
// }) => {
//   return (
//     <div
//       onClick={onClick}
//       style={style}
//       className={`rs-sidebarItem ${className}`.trim()}
//     >
//       {children}
//     </div>
//   );
// };

// export default memo(SidebarItem);

import React, { memo, useCallback, type MouseEvent } from "react";
import SidebarItemContext from "../context/SidebarItemContext";

export interface SidebarItemProps {
  children: React.ReactNode;
  onClick?: (item : string, e : MouseEvent<HTMLDivElement>) => void
  className?: string;
  itemGroup?: string
  style?: React.CSSProperties
  imageViewport?: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  children,
  onClick,
  className = "",
  itemGroup = "",
  imageViewport = "24 24",
  style = {},
}) => {

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(itemGroup, e)
    }
  }, [onClick, itemGroup])

  return (
    <SidebarItemContext.Provider value={{ sharedImageViewport: imageViewport, itemGroup }}>
      <div
        onClick={handleClick}
        style={{ ...style, position: 'relative' }}
        className={`rs-sidebarItem ${className}`.trim()}
      >
        {children}
      </div>
    </SidebarItemContext.Provider>
  );
};

export default memo(SidebarItem);