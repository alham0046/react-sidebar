import React, { memo } from "react";
import { useSidebarLayout } from "../context/SidebarLayoutContext";
import { motion } from "motion/react";

interface MainContentProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const MainContent: React.FC<MainContentProps> = ({
    children,
    className = "",
    style = {},
}) => {
    const { collapsedWidth } = useSidebarLayout();

    return (
        <motion.main
            //   className="min-h-screen overflow-y-auto transition-all duration-300"
            initial={false}
            className={`rs-mainContent ${className}`}
            animate={{ marginLeft: collapsedWidth }}
            transition={{ duration: 0.3 }}
            style={style}
        >
            {children}
        </motion.main>
    );
};

export default memo(MainContent);