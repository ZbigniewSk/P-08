import { useCallback } from 'react';
import { useAppContext } from '@magento/peregrine/lib/context/app';

export const useStoreInfoTrigger = () => {
    const [, { toggleDrawer }] = useAppContext();

    const handleOpenStoreInfo = useCallback(() => {
        toggleDrawer('storeinfo');
    }, [toggleDrawer]);

    return {
        handleOpenStoreInfo
    };
};