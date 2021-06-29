import React, { useContext, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md'
import AppContext from '../../providers/AppContext';
import { ModalContext } from '../../providers/ModalProvider';
import { ToastContext } from '../../providers/ToastProvider';
import { Account } from '../../types/crm';
import { Days } from '../../types/enums';
import { AddOrder } from '../../types/orders';
import { isSuccessStatusCode } from '../../utils/Helpers';
import AppButton from '../layout/AppButton';
import AppDropDown from '../layout/AppDropDown';
import AppTextInput from '../layout/AppTextInput';


const AddWorkOrderForm = () => {
    const {id, grpId, displayName, token} = useContext(AppContext);
    const {hide} = useContext(ModalContext);
    const {show} = useContext(ToastContext);
    const [account, setAccount] = useState('');
    const [containerQty, setContainerQty] = useState(0);
    const [demandRate, setDemandRate] = useState('');
    const [isDemo, setIsDemo] = useState(false);
    const [isRecurring, setIsRecurring] = useState(false);
    const [monthlyRate, setMonthlyRate] = useState('');
    const [location, setLocation] = useState('');
    const [serviceDate, setServiceDate] = useState('');
    const [serviceDays, setServiceDays] = useState(Days.sun.toString());
    const [accountList, setAccountList] = useState<Account[]>([]);
    
    useEffect(() => {
        getAccountsDropDown()
      }, []);

    //   useEffect(() => {
    //     if (accountList.length > 0) {
    //       setLocation(
    //         `${accountList![0].address.address_street}, ${accountList![0].address.address_city}, ${
    //           accountList![0].address.address_state
    //         } ${accountList![0].address.address_zip}`,
    //       );
    //     }
    //   }, [accountList]);

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
      const order: AddOrder = {
        _id: '',
        account_id: account,
        container_qty: containerQty,
        demand_rate: demandRate,
        group_id: grpId,
        haul_status: false,
        is_active: true,
        is_demo: isDemo,
        is_recurring: isRecurring,
        monthly_rate: monthlyRate,
        location: location,
        order_id: '',
        order_status: 'Not Started',
        services: 'smash',
        service_date: serviceDate,
        service_day: serviceDays,
        url: [],
        notes: [],
      }

      return order;
    };

    async function postNewOrder() {
      const order = await getFormData();
      
      await fetch(`${process.env.REACT_APP_TCMC_URI}/api/orders`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'x-access-token': token},
        body: JSON.stringify(order),
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
            <h4>New Work Order</h4>
          </div>
          <div className="form-header-icon">
            <MdClose size={24} onClick={() => hide({})} />
          </div>
        </div>

        <div className="form-body">
          <AppDropDown
            label='Account'
            value={account}
            list={accountList.map(u => {return {id: u._id, label: u.account_name, value: u._id}})}
            // onChange={(itemValue: any) => {
            //   setLocation(`${accountList!.filter((u) => u._id === itemValue.id)[0].address.address_street}, ${accountList.filter((u) => u._id === itemValue.id)[0].address.address_city}, ${accountList.filter((u) => u._id === itemValue.id)[0].address.address_state} ${accountList.filter((u) => u._id === itemValue.id)[0].address.address_zip}`);
            //   return setAccount(accountList!.filter((u) => u._id === itemValue.id)[0]._id);
            // }}
            onChange={setAccount}
          />
              <AppTextInput label='Location' value={location} onChange={() => null} disabled />
        </div>

        <div className="form-footer">
          <div className="footer-buttons">
            <AppButton label="Save" onClick={() => postNewOrder()} />
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

export default AddWorkOrderForm;