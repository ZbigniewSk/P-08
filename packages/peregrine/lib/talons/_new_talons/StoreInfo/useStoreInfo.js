import { useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';

import mergeOperations from '../../../util/shallowMerge';

import DEFAULT_OPERATIONS from './storeInfo.gql';

export const useStoreInfo = props => {

    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations)
    const { getStoreInfoQuery } = operations

    /*
    const [runQuery, queryResult] = useLazyQuery(getStoreInfoQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    })

    const { data } = queryResult

    // fetch data
    useEffect(() => {
        runQuery()
    }, [data, runQuery])

    return { data }
    */
    const { data } = useQuery(getStoreInfoQuery)
    
    return { data: data && data }
}