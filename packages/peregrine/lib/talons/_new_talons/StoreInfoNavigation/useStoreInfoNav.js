import { useAppContext } from '../../../context/app'
import { useCallback } from 'react'

export const useStoreInfoNav = (props = {}) => {
    const [appState, { closeDrawer }] = useAppContext()
    const { drawer } = appState
    const isOpen = drawer === 'storeinfo'

    const handleClose = useCallback(() => {
        closeDrawer()
    }, [closeDrawer])

    return {
        isOpen,
        handleClose
    }
}