import React, { useContext, useState } from 'react';
import { MdClose } from 'react-icons/md'
import AppContext from '../../providers/AppContext';
import { ModalContext } from '../../providers/ModalProvider';
import { ToastContext } from '../../providers/ToastProvider';
import { Account } from '../../types/crm';
import { isSuccessStatusCode } from '../../utils/Helpers';
import AppButton from '../layout/AppButton';
import AppTextInput from '../layout/AppTextInput';


const AddAccountForm = () => {
    const {id, grpId, displayName, token} = useContext(AppContext);
    const {hide} = useContext(ModalContext);
    const {show} = useContext(ToastContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');

    const getFormData = async () => {
      const account: Account = {
        _id: '',
        group_id: grpId,
        owner_id: id,
        owner_name: displayName,
        account_name: name,
        address: {
          address_street: street,
          address_city: city,
          address_state: state,
          address_zip: zip,
        },
        demo: '',
        email: email,
        hauling_contract: false,
        hauling_expiration: '',
        stage: 'Lead',
        geo_location: [],
        is_active: true,
        contacts: [],
        conversion: new Date(),
        national: false,
        referral: false,
        referral_group_id: null,
        notes: [''],
        drawerIsVisible: false,
        createdAt: '',
        updatedAt: '',
      }

      return account;
    };

    async function postNewAccount() {
      const account = await getFormData();
      
      await fetch(`${process.env.REACT_APP_TCMC_URI}/api/accounts`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'x-access-token': token},
        body: JSON.stringify(account),
      })
        .then((res) => res.json())
        .then((data) => {
          if (isSuccessStatusCode(data.status)) {
            show({ message: data.message });
            hide({});
          } else {
            show({ message: data.message });
          }
        })
        .catch((err) => show({message: err.message}));
    }

    return (
      <div className="app-form">
        <div className="form-header">
          <div className="form-header-title">
            <h4>New Account</h4>
          </div>
          <div className="form-header-icon">
            <MdClose size={24} onClick={() => hide({})} />
          </div>
        </div>

        <div className="form-body">
          <AppTextInput label='Account Name' value={name} onChange={setName} />
          <AppTextInput label='Email' value={email} onChange={setEmail} />
          <AppTextInput label='Street' value={street} onChange={setStreet} />
          <AppTextInput label='City' value={city} onChange={setCity} />
          <AppTextInput label='State' value={state} onChange={setState} />
          <AppTextInput label='Zip' value={zip} onChange={setZip} />
        </div>

        <div className="form-footer">
          <div className="footer-buttons">
            <AppButton label="Save" onClick={() => postNewAccount()} />
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

export default AddAccountForm;