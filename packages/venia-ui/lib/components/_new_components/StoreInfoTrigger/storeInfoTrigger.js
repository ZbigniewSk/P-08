import React from 'react'
import { mergeClasses } from '../../../classify'
import defaultClasses from './storeInfoTrigger.css'
import { Settings } from 'react-feather';
import Icon from '../../Icon';
import { useIntl } from 'react-intl'
import { useStoreInfoTrigger } from '@magento/peregrine/lib/talons/_new_talons/StoreInfoTrigger/useStoreInfoTrigger';
import { node, shape, string } from 'prop-types'

const StoreInfoTrigger = props => {

    const classes = mergeClasses(defaultClasses, props.classes);
    const { formatMessage } = useIntl()
    const infoText = formatMessage({
        id: 'infoTrigger.info',
        defaultMessage: 'Store Info'
    });

    const { handleOpenStoreInfo } = useStoreInfoTrigger()

    return (
        <button 
            className={classes.root}
            aria-label={formatMessage({
                id: 'storeInfoTrigger.ariaLabel',
                defaultMessage: 'Toggle store info panel'
            })}
            onClick={handleOpenStoreInfo}
        >
            <Icon src={Settings} />
            <span className={classes.label}>{infoText}</span>
        </button>
    )
}

export default StoreInfoTrigger

StoreInfoTrigger.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};