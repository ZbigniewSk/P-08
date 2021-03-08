import { useStoreInfoNav } from '@magento/peregrine/lib/talons/_new_talons/StoreInfoNavigation/useStoreInfoNav'
import React from 'react'
import StoreInfoNavHeader from './storeInfoNavHeader'
import { mergeClasses } from '../../../classify'
import defaultClasses from './storeInfoNav.css'
import { shape, string } from 'prop-types'
import StoreInfo from '../StoreInfo/storeInfo'


const StoreInfoNav = props => {

    const {
        isOpen,
        handleClose
    } = useStoreInfoNav()
    const classes = mergeClasses(defaultClasses, props.classes)
    const rootClassName = isOpen ? classes.root_open : classes.root

    return (
        <aside className={rootClassName}>
            <header className={classes.header}>
                <StoreInfoNavHeader 
                    onBack={handleClose}
                />
            </header>
            <div className={classes.body}>
                <StoreInfo />
            </div>
        </aside>
    )
}

export default StoreInfoNav

StoreInfoNav.propTypes = {
    classes: shape({
        body: string,
        header: string,
        root: string,
        root_open: string,
    })
}