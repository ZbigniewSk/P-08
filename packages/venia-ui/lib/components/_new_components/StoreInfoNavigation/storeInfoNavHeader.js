import React, { Fragment } from 'react'
import Trigger from '../../Trigger'
import Icon from '../../Icon'
import { X as CloseIcon } from 'react-feather'
import defaultClasses from './storeInfoNavHeader.css'
import { mergeClasses } from '../../../classify'
import { useIntl } from 'react-intl'
import { useStoreInfoNavHeader } from '@magento/peregrine/lib/talons/_new_talons/StoreInfoNavigation/useStoreInfoNavHeader'
import { func, shape, string } from 'prop-types'

const StoreInfoNavHeader = props => {

    const { onBack } = props
    const talonProps = useStoreInfoNavHeader({
        onBack
    })
    const { handleClose } = talonProps;

    const backIcon = CloseIcon
    const classes = mergeClasses(defaultClasses, props.classes)
    const { formatMessage } = useIntl()
    const title = formatMessage({
        id: 'storeInfoHeader.storeInfo',
        defaultMessage: 'Store Info'
    });
    const titleElement = <span>{title}</span>

    return (
        <Fragment>
            <Trigger key="backButton" action={handleClose}>
                <Icon src={backIcon} />
            </Trigger>
            <h2 key="title" className={classes.title}>
                {titleElement}
            </h2>
        </Fragment>
    )
}

export default StoreInfoNavHeader

StoreInfoNavHeader.propTypes = {
    classes: shape({
        title: string
    }),
    onBack: func.isRequired
}