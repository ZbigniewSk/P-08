import { useCallback } from 'react';


export const useStoreInfoNavHeader = props => {
    const { onBack } = props;

    const handleClose = useCallback(() => {
        onBack();
    }, [onBack]);

    return {
        handleClose
    };
};