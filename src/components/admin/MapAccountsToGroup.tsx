import React, { useContext, useEffect, useState } from 'react'
import { MdAddBox } from 'react-icons/md';
import AppContext from '../../providers/AppContext';
import { ToastContext } from '../../providers/ToastProvider';
import { Group } from '../../types';
import { Account } from '../../types/crm';
import { isSuccessStatusCode } from '../../utils/Helpers';
import AppButton from '../layout/AppButton';
import AppDropDown from '../layout/AppDropDown';

const MapAccountsToGroup = () => {
    const { grpId, token } = useContext(AppContext);
    const { show } = useContext(ToastContext);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [groupsList, setGroupsList] = useState<Group[]>([]);
    const [groupsNames, setGroupsNames] = useState<{ accountId: string, groupName: string }[]>([]);
    const [toggleArr, setToggleArr] = useState<{ _id: string, isVisible: boolean }[]>([]);

    useEffect(() => {
        getGroupsList();
        getUnmappedAccounts();
    }, []);

    const getGroupsList = async () => {
        await fetch(`${process.env.REACT_APP_TCMC_URI}/api/groupsBy`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: { 'Content-Type': 'application/json', 'x-access-token': token }
        })
            .then((res) => res.json())
            .then((json) => {
                if (isSuccessStatusCode(json.status)) {
                    setGroupsList(json.data);
                } else {
                    show({ message: json.message });
                }
            })
            .catch((err) => show({ message: err.message }));
    };

    const getUnmappedAccounts = () => {
        fetch(`${process.env.REACT_APP_TCMC_URI}/api/admin/getUnmappedAccounts`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'x-access-token': token },
        })
            .then(res => res.json())
            .then(json => {
                if (!isSuccessStatusCode(json.status)) {
                    show({ message: json.message });
                } else {
                    setAccounts(json.data);
                }
            });
    };

    const handleSetToggle = (id: string) => {
        let newToggleArr: { _id: string, isVisible: boolean }[] = toggleArr;

        if (!newToggleArr.find(tog => tog._id === id)) {
            newToggleArr.push({ _id: id, isVisible: true });
        } else {
            newToggleArr = newToggleArr.filter(u => u._id !== id);
        }

        setToggleArr([...newToggleArr]);
    };

    const handleSetGroupsNames = (id: string, grpName: string) => {
        let newNameArr: { accountId: string, groupName: string }[] = groupsNames;

        if (!newNameArr.find(name => name.accountId === id)) {
            newNameArr.push({ accountId: id, groupName: grpName });
        } else {
            newNameArr = newNameArr.map(u => {
                if (u.accountId === id) {
                    u.groupName = grpName;
                }
                return u;
            })
        }

        setGroupsNames([...newNameArr]);
    };

    const handleMapAccountToGroup = (id: string) => {
        let groupId = groupsNames.find(u => u.accountId === id)?.groupName;

        fetch(`${process.env.REACT_APP_TCMC_URI}/api/admin/mapAccountToGroup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-access-token': token },
            body: JSON.stringify({
                accountId: id,
                groupId 
            })
        })
            .then(res => res.json())
            .then(json => {
                if (isSuccessStatusCode(json.status)) {
                    show({ message: json.message });
                    removeMappedAccount(id);
                }
            })
            .catch(err => show({message: err.message}));
    };

    const removeMappedAccount = (id: string) => {
        let newAccountsArr = accounts;

        newAccountsArr = newAccountsArr.filter(u => u._id !== id);

        setAccounts([...newAccountsArr]);
    };

    return (
        <div style={{ paddingLeft: 30 }}>
            <div
                style={{
                    border: "1px solid lightgray",
                    borderRadius: '5px',
                    height: '500px',
                    overflowY: 'auto'
                }}
            >

                <h3 style={{ padding: 15, borderBottom: '1px solid lightgray' }}>Map Accounts To Group</h3>

                <div style={{ padding: 15 }}>
                    {accounts.map(u => {
                        return (
                            <div
                                key={u._id}
                                style={{
                                    border: '1px solid lightgray',
                                    padding: '5px',
                                    marginBottom: '10px',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'column'
                                }}
                            >
                                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                                    <label>{u.account_name}</label>
                                    <AppButton size='sm' label='' onClick={() => handleSetToggle(u._id)} >
                                        <MdAddBox size={20} />
                                    </AppButton>
                                </div>
                                {toggleArr.map(toggle => {
                                    if (toggle._id === u._id) {

                                        return (
                                            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', marginTop: 15, marginBottom: -15 }} key={toggle._id}>
                                                <AppDropDown
                                                    label='Group'
                                                    value={groupsNames.find(gName => gName.accountId === u._id)?.groupName}
                                                    onChange={(val: string) => handleSetGroupsNames(u._id, val)}
                                                    list={groupsList.map(gl => { return { id: gl._id, value: gl._id, label: gl.name } })}
                                                    block
                                                />
                                                <div style={{ marginTop: 15 }}>
                                                    <AppButton size='sm' label='Save' onClick={() => handleMapAccountToGroup(u._id)} secondary />
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
};

export default MapAccountsToGroup;