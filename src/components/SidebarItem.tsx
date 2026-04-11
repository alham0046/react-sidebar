import React, { memo } from "react";

export interface SidebarItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  children,
  onClick,
  className = "",
  style = {},
}) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`rs-sidebarItem ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default memo(SidebarItem);