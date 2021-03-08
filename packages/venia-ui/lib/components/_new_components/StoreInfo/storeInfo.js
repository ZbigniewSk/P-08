import React from 'react'
import { useStoreInfo } from '@magento/peregrine/lib/talons/_new_talons/StoreInfo/useStoreInfo'
import { mergeClasses } from '../../../classify';
import defaultClasses from './storeInfo.css'
import { shape, string } from 'prop-types'

const StoreInfo = props => {

    const classes = mergeClasses(defaultClasses, props.classes)
    const talonProps = useStoreInfo({})

    const { data } = talonProps;

    const displayList = data ? Object.keys(data.storeConfig).map((key) => 
    (<li className={classes.list} key={key}>{key}: {data.storeConfig[key]}</li>)) :
    (<li className={classes.list}>No data</li>)
    return (
        <div className={classes.root}>
            <ul className={classes.tree}>Store Config List
                {displayList}
            </ul>
        </div>
    )
}

export default StoreInfo

StoreInfo.propTypes = {
    classes: shape({
        root: string,
        tree: string,
        list: string
    })
}