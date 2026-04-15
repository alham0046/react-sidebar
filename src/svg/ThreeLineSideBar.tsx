import React, { memo } from 'react'

interface HamburgerProps {
    size?: number
    color?: string
    onClick?: () => void
}

const ThreeLineSideBar : React.FC<HamburgerProps> = ({ size = 20, color = "white", onClick }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={onClick}
        >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    )
}

export default memo(ThreeLineSideBar)


// import React, { memo } from 'react'

// const ThreeLineSideBar = ({ size = 40, color = "white" }) => {
//     return (
//         <svg
//             width={size}
//             height={size}
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke={color}
//             strokeWidth="2"
//             strokeLinecap="round"
//             className='border border-red-400'
//             strokeLinejoin="round"
//         >
//             <line x1="3" y1="12" x2="21" y2="12" />
//             <line x1="3" y1="6" x2="21" y2="6" />
//             <line x1="3" y1="18" x2="21" y2="18" />
//         </svg>
//     )
// }

// export default memo(ThreeLineSideBar)
