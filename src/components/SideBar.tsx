import React, { memo, useState } from 'react'
import SidebarContext from '../context/SidebarContext'
import { useSidebarLayout } from '../context/SidebarLayoutContext'
import { motion } from 'motion/react'

export interface SideBarProps {
  children: React.ReactNode
  defaultCollapsed?: boolean
  expandedWidth?: number
}

const SidebarRoot: React.FC<SideBarProps> = ({ children, defaultCollapsed = true, expandedWidth = 250 }) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  const toggle = () => setCollapsed(prev => !prev)

  const { collapsedWidth } = useSidebarLayout()

  // const width = collapsed ? collapsedWidth : expandedWidth
  const width = collapsed
    ? Number(collapsedWidth)
    : Number(expandedWidth)

  // const isHidden = collapseMode === "hidden" && collapsed
  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        toggle,
      }}
    >
      <div className={"rs-sidebarRootOuter"}>
        <motion.div
          initial={false}
          animate={{ width }}
          // transition={{ duration: 0.3, ease: "easeInOut" }}
          transition={{
            duration: 0.28,
            ease: [0.4, 0, 0.2, 1]
          }}
          className={"rs-sidebarRootMiddle"}
        // style={{ width }}
        >
          <div className={"rs-sidebarRootInner"}>
            {children}
          </div>
        </motion.div>
      </div>
    </SidebarContext.Provider>
  )
}

export default memo(SidebarRoot)




// import React, { memo, useState } from 'react'
// import ThreeLineSideBar from '../Svg/ThreeLineSideBar'
// import SidebarContext from './SidebarContext'
// import SidebarText from './SidebarText'

// interface SideBarProps {
//   children: React.ReactNode
//   collapseMode?: "icon" | "hidden"
//   defaultCollapsed?: boolean
// }

// const SidebarRoot: React.FC<SideBarProps> = ({ children, collapseMode = "icon", defaultCollapsed = true }) => {
//   const [collapsed, setCollapsed] = useState(defaultCollapsed)

//   const toggle = () => setCollapsed(prev => !prev)

//   const isHidden = collapseMode === "hidden" && collapsed
//   return (
//     <SidebarContext.Provider value={{ collapsed, toggle, collapseMode }}>
//       <div className='absolute grid justify-center py-5 h-full w-16 border-r border-red-500'>
//         <ThreeLineSideBar onClick={() => console.log('clicked hamburger')} />
//         {children}
//       </div>
//     </SidebarContext.Provider>
//   )
// }

// export default memo(SidebarRoot)
