import React, { useContext, useState } from 'react';
import { MdClose } from 'react-icons/md'
import Colors from '../../constants/Colors';
import { ModalContext } from '../../providers/ModalProvider';
import { ToastContext } from '../../providers/ToastProvider';
import AppButton from '../layout/AppButton';
import AppTextInput from '../layout/AppTextInput';


const AddAccountForm = () => {
    const {hide} = useContext(ModalContext);
    const {show} = useContext(ToastContext);
    const [name, setName] = useState('');
    const postNewAccount = () => {
        hide({});
        show({message: 'You Saved!'});
    };

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

        <div className='form-body'>
            <AppTextInput
              value={name}
              onChange={setName}
            />
        </div>

        <div className='form-footer'>
            <div className='footer-buttons'>
              <AppButton label='Save' onClick={() => postNewAccount()} />
              <AppButton size={'sm'} label='Cancel' onClick={() => hide({})} secondary outlined />
            </div>
        </div>
      </div>
    );
}

export default AddAccountForm;