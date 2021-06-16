import React, { useContext } from 'react';
import { MdClose } from 'react-icons/md'
import { ModalContext } from '../../providers/ModalProvider';


const AddAccountForm = () => {
    const {hide} = useContext(ModalContext);
    return (
      <div className="app-form">
        <div className="form-header">
          <div className='form-header-title'>
            <h4>New Account</h4>
          </div>
          <div className='form-header-icon'>
            <MdClose size={24} onClick={() => hide({})} />
          </div>
        </div>
      </div>
    );
}

export default AddAccountForm;