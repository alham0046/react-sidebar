import React, { memo } from "react";
import { useSidebar } from "../context/SidebarContext";

export interface SidebarToggleProps {
  children: React.ReactNode;
  className?: string;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ children, className = "" }) => {
  const { toggle } = useSidebar();

  return (
    <div
      onClick={toggle}
      className={`rs-sidebarToggle ${className}`}
    >
      {children}
    </div>
  );
};

export default memo(SidebarToggle);