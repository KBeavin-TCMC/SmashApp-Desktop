import React, { useContext, useState } from 'react';
import { MdClose } from 'react-icons/md'
import AppContext from '../../providers/AppContext';
import { ModalContext } from '../../providers/ModalProvider';
import { ToastContext } from '../../providers/ToastProvider';
import { Account } from '../../types/crm';
import { isSuccessStatusCode } from '../../utils/Helpers';
import AppButton from '../layout/AppButton';
import AppTextInput from '../layout/AppTextInput';


const UploadFranchiseForm = () => {
    const {id, grpId, displayName, token} = useContext(AppContext);
    const {hide} = useContext(ModalContext);
    const {show} = useContext(ToastContext);

    const uploadFranchises = () => {
        fetch(`${process.env.REACT_APP_TCMC_URI}/api/admin/updloadAllFranchises`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'x-access-headers': token},
            body: JSON.stringify({})
        })
    };

    return (
      <div className="app-form">
        <div className="form-header">
          <div className="form-header-title">
            <h4>Upload Franchises</h4>
          </div>
          <div className="form-header-icon">
            <MdClose size={24} onClick={() => hide({})} />
          </div>
        </div>

        <div className="form-body">
          {/* <AppTextInput label='Account Name' value={name} onChange={setName} />
          <AppTextInput label='Email' value={email} onChange={setEmail} />
          <AppTextInput label='Street' value={street} onChange={setStreet} />
          <AppTextInput label='City' value={city} onChange={setCity} />
          <AppTextInput label='State' value={state} onChange={setState} />
          <AppTextInput label='Zip' value={zip} onChange={setZip} /> */}
        </div>

        <div className="form-footer">
          <div className="footer-buttons">
            <AppButton label="Save" onClick={() => uploadFranchises()} />
            <AppButton
              size={"sm"}
              label="Cancel"
              onClick={() => hide({})}
              secondary
              outlined
            />
          </div>
        </div>
      </div>
    );
}

export default UploadFranchiseForm;