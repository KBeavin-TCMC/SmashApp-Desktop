import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { MdClose } from 'react-icons/md'
import AppContext from '../../providers/AppContext';
import { ModalContext } from '../../providers/ModalProvider';
import { ToastContext } from '../../providers/ToastProvider';
import { Account } from '../../types/crm';
import { AddAgreement, Agreement } from '../../types/orders';
import { isSuccessStatusCode } from '../../utils/Helpers';
import AppBtnGrp from '../layout/AppBtnGrp';
import AppButton from '../layout/AppButton';
import AppCheckbox from '../layout/AppCheckbox';
import AppDropDown from '../layout/AppDropDown';
import AppTextInput from '../layout/AppTextInput';


const AddAgreementForm = () => {
    const {id, grpId, displayName, token} = useContext(AppContext);
    const {hide} = useContext(ModalContext);
    const {show} = useContext(ToastContext);
    const [account, setAccount] = useState('');
    const [accountList, setAccountList] = useState<Account[]>([]);
    const [location, setLocation] = useState('');
    const [btnObj, setBtnObj] = useState<{[index: string]: boolean}>({['M']: false, ['T']: false, ['W']: false, ['Th']: false, ['F']: false, ['S']: false, ['SU']: false});
    const [containerQty, setContainerQty] = useState('');
    const [demandRate, setDemandRate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isRecurring, setIsRecurring] = useState(true);
    const [notes, setNotes] = useState('');
    const [recurringRate, setRecurringRate] = useState('');
    const [startDate, setStartDate] = useState('');
    

    useEffect(() => {
        getAccountsDropDown()
      }, []);

      useEffect(() => {
        if (accountList.length > 0) {
            setLocation(`${accountList.filter((u) => u._id === account)[0].address.address_street}, ${accountList.filter((u) => u._id === account)[0].address.address_city}, ${accountList.filter((u) => u._id === account)[0].address.address_state} ${accountList.filter((u) => u._id === account)[0].address.address_zip}`);
        }
    }, [account])

      const getAccountsDropDown = () => {
        fetch(`${process.env.REACT_APP_TCMC_URI}/api/accountsBy`, {
          method: 'POST',
          body: JSON.stringify({group_id: grpId}),
          headers: {'Content-Type': 'application/json', 'x-access-token': token},
        })
          .then((res) => res.json())
          .then((json) => {
              if (isSuccessStatusCode(json.status)) {
                  setAccountList(json.data);
                  setAccount(json.data[0]._id);
              } else {
                  show({message: json.message});
              }
          })
          .catch((err) => show({message: err.message}));
      };

    const getFormData = async () => {
      const newAgreement: AddAgreement = {
        _id: '',
        account_id: account,
        container_qty: containerQty,
        demand_rate: demandRate,
        end_date: endDate,
        group_id: grpId,
        agreement_id: '',
        is_active: true,
        is_recurring: isRecurring,
        location: location,
        notes: notes,
        owner_id: id,
        recurring_rate: recurringRate,
        services: 'smash',
        start_date: startDate,
        url: '',
        day_freq: getBtnGrpValues()
      }

      return newAgreement;
    };

    const getBtnGrpValues = () : number[] => {
        let freqArr: number[] = [];
  
        Object.entries(btnObj).map((u, i) => freqArr.push(u[1] ? 1 : 0));
  
        return freqArr;
      };

    async function postNewAgreement() {
      const agreement = await getFormData();

      await fetch(`${process.env.REACT_APP_TCMC_URI}/api/agreementsRecurring`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'x-access-token': token},
        body: JSON.stringify(agreement),
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
            <h4>Service Agreement</h4>
          </div>
          <div className="form-header-icon">
            <MdClose size={24} onClick={() => hide({})} />
          </div>
        </div>

        <div className="form-body" style={{ padding: 0 }}>
          <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
            <AppDropDown
              label="Account Name"
              value={account}
              onChange={setAccount}
              list={accountList.map((u: Account) => {
                return {
                  id: u._id,
                  label: u.account_name,
                  value: u._id,
                };
              })}
            />
          </div>
          <hr></hr>
          <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
            <AppTextInput
              label="Location"
              value={location}
              onChange={() => null}
              disabled
            />
            
            <div style={{display: 'flex'}}>
              <p style={{marginRight: '15px'}}>Service Weekdays</p>
              <AppBtnGrp state={{btnObj, setBtnObj}} />
            </div>

            <AppTextInput label='On Demand Rate' value={demandRate} onChange={setDemandRate} type='number' />
            <AppCheckbox label='Is Recurring' value={isRecurring} onChange={setIsRecurring} />
            <AppTextInput label='Recurring Rate' value={recurringRate} onChange={setRecurringRate} type='number' />
            <AppTextInput label='Container Quantity' value={containerQty} onChange={setContainerQty} />
            <AppTextInput label='Start Date' value={startDate} onChange={setStartDate} type='date' />
            <AppTextInput label='End Date' value={endDate} onChange={setEndDate} type='date' />

          </div>
        </div>

        <div className="form-footer">
          <div className="footer-buttons">
            <AppButton label="Save" onClick={() => postNewAgreement()} />
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

export default AddAgreementForm;