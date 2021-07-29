import React, { useContext, useState } from 'react';
import { MdClose } from 'react-icons/md'
import AppContext from '../../providers/AppContext';
import { ModalContext } from '../../providers/ModalProvider';
import { ToastContext } from '../../providers/ToastProvider';
import { Group } from '../../types';
import { Account } from '../../types/crm';
import { isSuccessStatusCode } from '../../utils/Helpers';
import AppButton from '../layout/AppButton';
import AppTextInput from '../layout/AppTextInput';


const AddGroupForm = () => {
    const {id, grpId, displayName, token} = useContext(AppContext);
    const {hide} = useContext(ModalContext);
    const {show} = useContext(ToastContext);
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [dba, setDba] = useState('');
    const [ein, setEin] = useState('');
    const [email, setEmail] = useState('');
    const [launchDate, setLaunchDate] = useState('');
    const [legalCompany, setLegalCompany] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [region, setRegion] = useState('');
    const [signingDate, setSigningDate] = useState('');
    const [taxRate, setTaxRate] = useState('');
    const [territoryZips, setTerritoryZips] = useState('');
    const [timeZone, setTimeZone] = useState('');
    const [webpage, setWebpage] = useState('');

    const getFormData = async () => {
      const newGroup: Group = {
        _id: '',
        address: {
            address_city: city,
            address_state: state,
            address_street: street,
            address_zip: zip,
        },
        address_city: city,
        address_state: state,
        address_street: street,
        address_zip: zip,
        dba: dba,
        ein: ein,
        email: email,
        is_active: true,
        launch_date: new Date(launchDate),
        legal_company: legalCompany,
        name: name,
        phone: phone,
        region: region,
        signing_date: signingDate,
        tax_rate: taxRate,
        territory_zips: territoryZips,
        time_zone: timeZone,
        webpage: webpage,
      }

      return newGroup;
    };

    async function postNewGroup() {
      const group = await getFormData();
      
      await fetch(`${process.env.REACT_APP_TCMC_URI}/api/groups`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'x-access-token': token},
        body: JSON.stringify(group),
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
            <h4>New Franchise</h4>
          </div>
          <div className="form-header-icon">
            <MdClose size={24} onClick={() => hide({})} />
          </div>
        </div>

        <div className="form-body">
          <AppTextInput label='Franchise Name' value={name} onChange={setName} />
          <AppTextInput label='Phone' value={phone} onChange={setPhone} />
          <AppTextInput label='Email' value={email} onChange={setEmail} />
          <AppTextInput label='Web Page' value={webpage} onChange={setWebpage} />
          <AppTextInput label='Street' value={street} onChange={setStreet} />
          <AppTextInput label='City' value={city} onChange={setCity} />
          <AppTextInput label='State' value={state} onChange={setState} />
          <AppTextInput label='Zip' value={zip} onChange={setZip} />
          <AppTextInput label='Launch Date' value={launchDate} onChange={setLaunchDate} type='date' />
          <AppTextInput label='Signing Date' value={signingDate} onChange={setSigningDate} type='date' />
          <AppTextInput label='DBA' value={dba} onChange={setDba} />
          <AppTextInput label='EIN' value={ein} onChange={setEin} />
          <AppTextInput label='Legal Company' value={legalCompany} onChange={setLegalCompany} />
          <AppTextInput label='region' value={region} onChange={setRegion} />
          <AppTextInput label='Tax Rate' value={taxRate} onChange={setTaxRate} />
          <AppTextInput label='Territory Zips' value={territoryZips} onChange={setTerritoryZips} />
          <AppTextInput label='Time Zone' value={timeZone} onChange={setTimeZone} />

        </div>

        <div className="form-footer">
          <div className="footer-buttons">
            <AppButton label="Save" onClick={() => postNewGroup()} />
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

export default AddGroupForm;