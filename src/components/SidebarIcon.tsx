import React, { memo } from "react";

export interface SidebarIconProps {
  children: React.ReactNode;
  imageViewport?: string;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ children, imageViewport = "24 24" }) => {
  const [width, height] = imageViewport.split(" ");

  return (
    <div
      // className="flex-shrink-0 flex items-center justify-center"
      style={{ width, height }}
      className={`rs-sidebarIcon border`}
    >
      {children}
    </div>
  );
};

export default memo(SidebarIcon);