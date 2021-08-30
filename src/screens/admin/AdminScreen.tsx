import React, { useContext, useState } from 'react';
import MapAccountsToGroup from '../../components/admin/MapAccountsToGroup';
import UploadFranchiseForm from '../../components/admin/UploadFranchiseForm';
import AppButton from '../../components/layout/AppButton';
import AppTitle from '../../components/layout/AppTitle';
import { ModalContext } from '../../providers/ModalProvider';

const AdminScreen = () => {
    const modal = useContext(ModalContext);
    const [content, setContent] = useState([
        { name: 'MapAccountsToGroup', isVisible: false, component: <MapAccountsToGroup /> },
        { name: 'GetFranchise', isVisible: false, component: null }
    ]);

    const handleSetContent = (name: string) => {
        let newArr = content;
        // First set all to false
        newArr.forEach(u => u.isVisible = false);
        // Second find name
        newArr.forEach(u => {
            if (u.name === name) {
                u.isVisible = true;
            }
        });
        // Third update state
        setContent([...newArr]);
    };

    return (
        <div className='app-admin'>
            <AppTitle title="Admin" />
            <div className='app-admin-content'>
                <div className='app-admin-buttons'>
                    <AppButton label="Get Franchise" onClick={() => {
                        handleSetContent('GetFranchise');
                        modal.show({ form: <UploadFranchiseForm /> });
                    }}
                    />
                    <AppButton label="Map Accounts To Group" onClick={() => handleSetContent('MapAccountsToGroup')} />
                </div>
                <div>
                    {content.map(u => {
                        if (u.isVisible) {

                            return (
                                <div key={u.name}>{u.component}</div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
};

export default AdminScreen;