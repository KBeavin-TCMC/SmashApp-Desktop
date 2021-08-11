import React, { useContext } from 'react';
import UploadFranchiseForm from '../../components/admin/UploadFranchiseForm';
import AppButton from '../../components/layout/AppButton';
import AppTitle from '../../components/layout/AppTitle';
import { ModalContext } from '../../providers/ModalProvider';

const AdminScreen = () => {
    const modal = useContext(ModalContext);

    return (
        <>
            <AppTitle title="Admin" />
            <AppButton label="Get Franchise" onClick={() => modal.show({ form: <UploadFranchiseForm/>})}/>
        </>
    )
};

export default AdminScreen;