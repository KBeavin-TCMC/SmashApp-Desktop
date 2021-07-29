import React, { useContext } from 'react';
import AppTitle from '../../components/layout/AppTitle';
import { MdAccountCircle, MdBusiness, MdPeople, MdAssignment, MdPinDrop, MdMonetizationOn } from "react-icons/md";
import AppTextInput from '../../components/layout/AppTextInput';
import AppContext from '../../providers/AppContext';
import { ModalContext } from '../../providers/ModalProvider';
import AddGroupForm from '../../components/header/AddGroupForm';


const SettingsScreen = () => {
  const { grpId, token, role } = useContext(AppContext);
  const modal = useContext(ModalContext);

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
            <div className='tab-footer-item' onClick={() => alert("Implement Log Out Function.")}>
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
              <div className='content-item' onClick={() => modal.show({ form: <AddGroupForm />})}>
                <label className='link'>Add Franchise</label>
              </div>
            ) : null}
          </div>

          <div id='franchise-settings' className='settings-content-container'>
            <div className='content-header'>
              <h4>Franchise Settings</h4>
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