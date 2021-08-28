import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../providers/AppContext';
import { ToastContext } from '../../providers/ToastProvider';
import { isSuccessStatusCode } from '../../utils/Helpers';

const MapAccountsToGroup = () => {
    const {grpId, token} = useContext(AppContext);
    const {show} = useContext(ToastContext);
    const [accounts, setAccounts] = useState<any[]>([]);

    useEffect(() => {
        getUnmappedAccounts();
    }, []);

    const getUnmappedAccounts = () => {
        fetch(`${process.env.REACT_APP_TCMC_URI}/api/admin/getUmappedAccounts`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'x-access-headers': token},
        })
        .then(res => res.json())
        .then(json => {
            if (!isSuccessStatusCode(json.status)) {
                show({message: json.message});
            }
            setAccounts(json.data);
        })
    };

    return (
        <div style={{paddingLeft: 30}}>
            <h1>Map Accounts To Group</h1>
            
            <div>

            </div>
        </div>
    )
};

export default MapAccountsToGroup;