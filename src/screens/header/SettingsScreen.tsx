import React, { useContext, useEffect, useState } from 'react';
import AppTitle from '../../components/layout/AppTitle';
import { MdAccountCircle, MdBusiness, MdPeople, MdAssignment, MdPinDrop, MdMonetizationOn } from "react-icons/md";
import AppTextInput from '../../components/layout/AppTextInput';
import AppContext from '../../providers/AppContext';
import { ModalContext } from '../../providers/ModalProvider';
import AddGroupForm from '../../components/header/AddGroupForm';
import { isSuccessStatusCode } from '../../utils/Helpers';
import { ToastContext } from '../../providers/ToastProvider';
import { Group } from '../../types';
import AppCheckbox from '../../components/layout/AppCheckbox';
import { useHistory } from 'react-router-dom';


const SettingsScreen = () => {
  let history = useHistory();
  const { grpId, token, role, setToken, setIsAuth } = useContext(AppContext);
  const modal = useContext(ModalContext);
  const { show, hide } = useContext(ToastContext);
  const [franchise, setFranchise] = useState<Group | any>();

  useEffect(() => {
    getFranchise();
  }, [])

  const getFranchise = async () => {
    fetch(`${process.env.REACT_APP_TCMC_URI}/api/groupsBy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-token': token },
      body: JSON.stringify({ _id: grpId }),
    })
      .then((res) => res.json())
      .then((json) => {

        if (isSuccessStatusCode(json.status)) {
          setFranchise(json.data[0]);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => show({ message: err.message }));
  }

  const handleTabOnClick = (tabId: string, contentId: string) => {
    let contents = document.querySelectorAll('.settings-content-container');
    let tabs = document.querySelectorAll('.tab-item');

    contents.forEach(u => {
      if (u.id === contentId) {
        u.className = 'settings-content-container active';
      } else {
        u.className = 'settings-content-container';
      }
    });
    tabs.forEach(u => {
      if (u.id === tabId) {
        u.className = 'tab-item active';
      } else {
        u.className = 'tab-item';
      }
    });



    console.log('contents: ', contents);
    console.log('tabs: ', tabs);
  };

  const logout = () => {
    history.push('/');
    window.localStorage.removeItem('smtUser');
    setToken('');
    setIsAuth(false);
  }

  return (
    <div className='settings-screen'>
      <AppTitle title="Settings" />

      <div className='settings-container'>

        <div className='settings-tabs'>
          <div className='tab-list'>
            <div id='user-tab' className='tab-item active' onClick={() => handleTabOnClick('user-tab', 'user-settings')}>
              <MdAccountCircle className='tab-item-icon' />
              <h5>User Settings</h5>
            </div>
            <div id='franchise-tab' className='tab-item' onClick={() => handleTabOnClick('franchise-tab', 'franchise-settings')}>
              <MdBusiness className='tab-item-icon' />
              <h5>Franchise Settings</h5>
            </div>
            <div id='crm-tab' className='tab-item' onClick={() => handleTabOnClick('crm-tab', 'crm-settings')}>
              <MdPeople className='tab-item-icon' />
              <h5>CRM Settings</h5>
            </div>
            <div id='order-tab' className='tab-item' onClick={() => handleTabOnClick('order-tab', 'order-settings')}>
              <MdAssignment className='tab-item-icon' />
              <h5>Order Settings</h5>
            </div>
            <div id='route-tab' className='tab-item' onClick={() => handleTabOnClick('route-tab', 'route-settings')}>
              <MdPinDrop className='tab-item-icon' />
              <h5>Route Settings</h5>
            </div>
            <div id='invoice-tab' className='tab-item' onClick={() => handleTabOnClick('invoice-tab', 'invoice-settings')}>
              <MdMonetizationOn className='tab-item-icon' />
              <h5>Invoice Settings</h5>
            </div>
          </div>
          <div className='tab-footer'>
            <div className='tab-footer-item' onClick={() => window.location.href = 'http://smthub.us/'}>
              <label>Help Center</label>
            </div>
            <div className='tab-footer-item' onClick={logout}>
              <label>Log Out</label>
            </div>
          </div>
        </div>

        <div className='settings-content'>
          <div id='user-settings' className='settings-content-container active'>
            <div className='content-header'>
              <h4>User Settings</h4>
            </div>
            <div className='content-item'>
              <label>Edit Display Name</label>
              <AppTextInput label='' value={''} onChange={() => null} />
            </div>
            <div className='content-item'>
              <label className='link'>Edit Avatar</label>
              <MdAccountCircle style={{ fontSize: '28px', marginBottom: '15px' }} />
            </div>
            <div className='content-item'>
              <label className='link'>Edit Password</label>
            </div>
            {role === 'admin' ? (
              <div className='content-item' onClick={() => modal.show({ form: <AddGroupForm /> })}>
                <label className='link'>Add Franchise</label>
              </div>
            ) : null}
          </div>

          <div id='franchise-settings' className='settings-content-container'>
            <div className='content-header'>
              <h4>Franchise Settings</h4>
            </div>

            <div className='content-item'>
              <AppTextInput
                label='Franchise Name'
                value={!franchise ? '' : franchise.name}
                onChange={(val) => setFranchise({ ...franchise, name: val })}
              />
              <AppTextInput
                label='DBA'
                value={!franchise ? '' : franchise.dba}
                onChange={(val) => setFranchise({ ...franchise, dba: val })}
              />
              <AppTextInput
                label='Legal Company'
                value={!franchise ? '' : franchise.legal_company}
                onChange={(val) => setFranchise({ ...franchise, legal_company: val })}
              />
            </div>

            <div className='content-item'>
              <AppTextInput
                label='Address Street'
                value={!franchise ? '' : franchise.address.address_street}
                onChange={(val) => setFranchise({ ...franchise, address_street: val })}
              />
              <AppTextInput
                label='Address City'
                value={!franchise ? '' : franchise.address.address_city}
                onChange={(val) => setFranchise({ ...franchise, address_city: val })}
              />
              <AppTextInput
                label='Address State'
                value={!franchise ? '' : franchise.address.address_state}
                onChange={(val) => setFranchise({ ...franchise, address_state: val })}
              />
              <AppTextInput
                label='Address Zip'
                value={!franchise ? '' : franchise.address.address_zip}
                onChange={(val) => setFranchise({ ...franchise, address_zip: val })}
              />
            </div>

            <div className='content-item'>
              <AppTextInput
                label='Email'
                value={!franchise ? '' : franchise.email}
                onChange={(val) => setFranchise({ ...franchise, email: val })}
              />
              <AppTextInput
                label='EIN'
                value={!franchise ? '' : franchise.ein}
                onChange={(val) => setFranchise({ ...franchise, ein: val })}
              />
              <AppTextInput
                label='Phone'
                value={!franchise ? '' : franchise.phone}
                onChange={(val) => setFranchise({ ...franchise, phone: val })}
              />
            </div>

            <div className='content-item'>
              <AppTextInput
                label='Signing Date'
                value={!franchise ? '' : franchise.signing_date}
                onChange={(val) => setFranchise({ ...franchise, signing_date: val })}
                type='date'
              />
              <AppTextInput
                label='Launch Date'
                value={!franchise ? '' : franchise.launch_date}
                onChange={(val) => setFranchise({ ...franchise, launch_date: val })}
                type='date'
              />
              <AppTextInput
                label='Time Zone'
                value={!franchise ? '' : franchise.time_zone}
                onChange={(val) => setFranchise({ ...franchise, time_zone: val })}
              />
              <AppTextInput
                label='Region'
                value={!franchise ? '' : franchise.region}
                onChange={(val) => setFranchise({ ...franchise, region: val })}
              />
            </div>

            <div className='content-item'>
              <AppTextInput
                label='Tax Rate'
                value={!franchise ? '' : franchise.tax_rate}
                onChange={(val) => setFranchise({ ...franchise, tax_rate: val })}
              />
              <AppTextInput
                label='Territory Zips'
                value={!franchise ? '' : franchise.territory_zips}
                onChange={(val) => setFranchise({ ...franchise, territory_zips: val })}
              />
              <AppTextInput
                label='Webpage'
                value={!franchise ? '' : franchise.webpage}
                onChange={(val) => setFranchise({ ...franchise, webpage: val })}
              />
            </div>

            <div className='content-item' style={{ justifyContent: 'flex-end' }}>
              <AppCheckbox
                label='Is Active'
                value={!franchise ? false : franchise.is_active}
                onChange={(val) => setFranchise({ ...franchise, is_active: val })}
              />
            </div>
          </div>

          <div id='crm-settings' className='settings-content-container'>
            <div className='content-header'>
              <h4>CRM Settings</h4>
            </div>
            <div className='content-item'>
              <label>Edit Display Name</label>
              <AppTextInput label='' value={''} onChange={() => null} />
            </div>
            <div className='content-item'>
              <label className='link'>Edit Avatar</label>
              <MdAccountCircle style={{ fontSize: '28px', marginBottom: '15px' }} />
            </div>
            <div className='content-item'>
              <label className='link'>Edit Password</label>
            </div>
          </div>

          <div id='order-settings' className='settings-content-container'>
            <div className='content-header'>
              <h4>Order Settings</h4>
            </div>
            <div className='content-item'>
              <label>Edit Display Name</label>
              <AppTextInput label='' value={''} onChange={() => null} />
            </div>
            <div className='content-item'>
              <label className='link'>Edit Avatar</label>
              <MdAccountCircle style={{ fontSize: '28px', marginBottom: '15px' }} />
            </div>
            <div className='content-item'>
              <label className='link'>Edit Password</label>
            </div>
          </div>

          <div id='route-settings' className='settings-content-container'>
            <div className='content-header'>
              <h4>Route Settings</h4>
            </div>
            <div className='content-item'>
              <label>Edit Display Name</label>
              <AppTextInput label='' value={''} onChange={() => null} />
            </div>
            <div className='content-item'>
              <label className='link'>Edit Avatar</label>
              <MdAccountCircle style={{ fontSize: '28px', marginBottom: '15px' }} />
            </div>
            <div className='content-item'>
              <label className='link'>Edit Password</label>
            </div>
          </div>

          <div id='invoice-settings' className='settings-content-container'>
            <div className='content-header'>
              <h4>Invoice Settings</h4>
            </div>
            <div className='content-item'>
              <label>Edit Display Name</label>
              <AppTextInput label='' value={''} onChange={() => null} />
            </div>
            <div className='content-item'>
              <label className='link'>Edit Avatar</label>
              <MdAccountCircle style={{ fontSize: '28px', marginBottom: '15px' }} />
            </div>
            <div className='content-item'>
              <label className='link'>Edit Password</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsScreen;