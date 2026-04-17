import { memo, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSidebarActions } from '../hooks/useSidebar'

const Navigator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {registerNavigate, setStyleViaPath} = useSidebarActions()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        registerNavigate(navigate)
    }, [])

    useEffect(() => {
        setStyleViaPath(location.pathname)
    }, [location])

    return (
        <>
            {children}
        </>
    )
}

export default memo(Navigator)

// </NavigatorContext.Provider>
// <NavigatorContext.Provider value={navigationContext}>