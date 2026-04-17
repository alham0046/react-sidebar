import React, { memo, useCallback, useEffect, useMemo, useRef, type MouseEvent } from "react";
import SidebarItemContext from "../context/SidebarItemContext";
import type { Shortcut } from "./SideBar";
import { useSidebarActions } from "../hooks/useSidebar";
import { randomString } from "../utils/stringManiputation";
import { OnClick } from "@/types/actions";

export interface SidebarItemProps {
  children: React.ReactNode;
  // onClick?: (item: string, e?: MouseEvent<HTMLDivElement>) => void
  onClick?: OnClick
  className?: string;
  itemGroup?: string
  style?: React.CSSProperties
  route?: string
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
  route = "",
  imageViewport = "24 24",
  TwActiveStyles = "",
  activeStyle = EMPTY_STYLE,
  style = {},
  shortcut
}) => {
  const { registerKey, registerElement, registerStyle, onItemClick, registerRoute } = useSidebarActions()

  // const id = uniqueId || randomString(); /////👉 This runs on EVERY render → new id → breaks everything
  const idRef = useRef(uniqueId || randomString());
  const id = idRef.current;

  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    // setActiveStyle(id)
    onItemClick(id)
    onClick?.({ routePath: route, routeName: itemGroup, e })
  }, [itemGroup, onItemClick, onClick, id, route]);

  useEffect(() => {
    if (route) {
      registerRoute(id, route);
    }
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

  const itemContext = useMemo(() => ({ sharedImageViewport: imageViewport, routePath : route, routeName : itemGroup }), [itemGroup, imageViewport]);

  // const { collapsed } = useSidebar()
  return (
    <SidebarItemContext.Provider value={itemContext}>
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