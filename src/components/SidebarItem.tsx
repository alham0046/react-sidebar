import React, { memo, useCallback, useEffect, useRef, type MouseEvent } from "react";
import SidebarItemContext from "../context/SidebarItemContext";
import type { Shortcut } from "./SideBar";
import { useSidebarActions } from "../hooks/useSidebar";
import { randomString } from "../utils/stringManiputation";

export interface SidebarItemProps {
  children: React.ReactNode;
  onClick?: (item: string, e?: MouseEvent<HTMLDivElement>) => void
  className?: string;
  itemGroup?: string
  style?: React.CSSProperties
  uniqueId?: string
  imageViewport?: string
  shortcut?: Shortcut
  TwActiveStyles?: string;
  activeStyle?: React.CSSProperties;
}

const EMPTY_STYLE = {};

const SidebarItem: React.FC<SidebarItemProps> = ({
  children,
  onClick,
  className = "",
  itemGroup = "",
  uniqueId,
  imageViewport = "24 24",
  TwActiveStyles = "",
  activeStyle = EMPTY_STYLE,
  style = {},
  shortcut
}) => {
  const { registerKey, setActiveStyle, registerElement, registerStyle } = useSidebarActions()

  // const id = uniqueId || randomString(); /////👉 This runs on EVERY render → new id → breaks everything
  const idRef = useRef(uniqueId || randomString());
  const id = idRef.current;

  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    setActiveStyle(id)
    onClick?.(itemGroup, e)
  }, [itemGroup, setActiveStyle, onClick, id]);

  useEffect(() => {
    if (!ref.current) return;
    return registerElement(id, ref.current);
  }, [id]);

  useEffect(() => {
    return registerStyle(id, {
      className: TwActiveStyles,
      style: activeStyle
    });
  }, [id, TwActiveStyles, activeStyle]);

  // const actions = () => (shortcut?.action ? shortcut.action() : handleClick(undefined as unknown as MouseEvent<HTMLDivElement>))
  const actions = useCallback(() => {
    return shortcut?.action
      ? shortcut.action()
      : handleClick(undefined as unknown as MouseEvent<HTMLDivElement>);
  }, [shortcut, handleClick]);
  useEffect(() => {
    if (!shortcut || !registerKey) return;

    const unregister = registerKey({
      ...shortcut,
      action: actions
    });

    return unregister;
  }, [shortcut, registerKey, actions]);

  // const { collapsed } = useSidebar()
  return (
    <SidebarItemContext.Provider value={{ sharedImageViewport: imageViewport, itemGroup }}>
      <div
        ref={ref}
        onClick={handleClick}
        style={{ ...style, position: 'relative' }}
        className={`rs-sidebarItem ${className}`.trim()}
      // className={`rs-sidebarItem ${collapsed ? "rs-collapsed" : ""} ${className}`}
      >
        {children}
      </div>
    </SidebarItemContext.Provider>
  );
};

export default memo(SidebarItem);
// import React, { memo, useCallback, type MouseEvent } from "react";
// import SidebarItemContext from "../context/SidebarItemContext";

// export interface SidebarItemProps {
//   children: React.ReactNode;
//   onClick?: (item : string, e : MouseEvent<HTMLDivElement>) => void
//   className?: string;
//   itemGroup?: string
//   style?: React.CSSProperties
//   imageViewport?: string
// }

// const SidebarItem: React.FC<SidebarItemProps> = ({
//   children,
//   onClick,
//   className = "",
//   itemGroup = "",
//   imageViewport = "24 24",
//   style = {},
// }) => {

//   const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
//     if (onClick) {
//       onClick(itemGroup, e)
//     }
//   }, [onClick, itemGroup])

//   return (
//     <SidebarItemContext.Provider value={{ sharedImageViewport: imageViewport, itemGroup }}>
//       <div
//         onClick={handleClick}
//         style={{ ...style, position: 'relative' }}
//         className={`rs-sidebarItem ${className}`.trim()}
//       >
//         {children}
//       </div>
//     </SidebarItemContext.Provider>
//   );
// };

// export default memo(SidebarItem);