import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppButton from '../../components/layout/AppButton';
import { MdAddBox } from 'react-icons/md';

import AppTitle from '../../components/layout/AppTitle';
import useDates from '../../hooks/useDates';
import AppContext from '../../providers/AppContext';
import { ToastContext } from '../../providers/ToastProvider';
import { Account } from '../../types/crm';
import { Invoice } from '../../types/invoices';
import { Agreement, Order } from '../../types/orders';
import { isSuccessStatusCode } from '../../utils/Helpers';
import { ModalContext } from '../../providers/ModalProvider';
import AddAgreementForm from '../../components/crm/AddAgreementForm';
import AddWorkOrderForm from '../../components/crm/AddWorkOrderForm';
import AddInvoiceForm from '../../components/invoices/AddInvoiceForm';
import { CrmContext } from '../../providers/CrmProvider';

const AccountDetailsScreen = () => {
  let history = useHistory();
  const { REACT_APP_TCMC_URI } = process.env;
  let params: { id: string } = useParams();
  const {screen, setDetailFilter} = useContext(CrmContext);
  const { getSelectedDateRange } = useDates();
  const { grpId, token } = useContext(AppContext);
  const { show } = useContext(ToastContext);
  const modal = useContext(ModalContext);
  const [account, setAccount] = useState<Account>();
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    getAccountDetails();
  }, [grpId, token, REACT_APP_TCMC_URI, params.id]);

  const getAccountDetails = async () => {
    fetch(`${REACT_APP_TCMC_URI}/api/accountsBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId, _id: params.id }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setAccount(json.data[0]);
          getAgreements(json.data[0]._id);
          getOrders(json.data[0]._id);
          getInvoices(json.data[0]._id);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => {
        show({ message: err.message });
      });
  };

  const getAgreements = async (accountId: string) => {
    fetch(`${REACT_APP_TCMC_URI}/api/agreementsBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId, account_id: accountId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setAgreements(json.data);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => {
        show({ message: err.message });
      });
  };

  const getOrders = async (accountId: string) => {
    fetch(`${REACT_APP_TCMC_URI}/api/ordersBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId, account_id: accountId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setOrders(json.data);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => {
        show({ message: err.message });
      });
  };

  const getInvoices = async (accountId: string) => {
    fetch(`${REACT_APP_TCMC_URI}/api/invoicesBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId, account_id: accountId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setInvoices(json.data);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => {
        show({ message: err.message });
      });
  };

  const getTodaysOrders = () => {
    let dateObj = getSelectedDateRange(new Date());

    return orders.map(u => {
      if (new Date(u.service_date).toLocaleDateString() == new Date(dateObj.gte).toLocaleDateString()) {
        return (
          <div key={u._id} className='details-card'>
            <p>{u.order_id}</p>
            <p>Type: {u.is_demo ? 'Demo' : 'Recurring'}</p>
            <p>Status: {u.order_status}</p>
            <p>Service Date: {new Date(u.service_date).toLocaleDateString()}</p>
            <p>{u.route_id}</p>
            <AppButton label='Order Details' onClick={() => history.push(`/orders/orders/${u._id}`)} block />
          </div>
        )
      }
    })
  };

  const setBtnRowFilter = (type: string, index: number) => {
    let newFilter = [...screen.detailFilter];
    
    if (type === 'Details') {
      newFilter.forEach((u: any) => u.selected = false);
      newFilter[index].selected = true;
    }

    setDetailFilter(newFilter);
  };

  const renderDetailRow = () => {
    if (screen.detailFilter.find(u => u.selected === true)!.name === "Details") {
      return (
        <div className="details-row">

        <div className="details-column">
          <div className='details-column-container'>
            <div className='details-column-header'>
              <h3>Details</h3>
              <p>{account?.account_name}</p>
              <p>{account?.address.address_street}</p>
              <p>{account?.address.address_city}, {account?.address.address_state + ' ' + account?.address.address_zip}</p>
            </div>

            <div>
              <h5 style={{ marginLeft: '15px' }}>Current Agreement</h5>
              <hr />
            </div>
            <div className='details-card'>
              {!agreements[0] ? (
                <p>No Agreement</p>
              ) : (
                <>
                  <p>{agreements[0].agreement_id}</p>
                  <p>{account!.account_name}</p>
                  <p>Remaining Term: {'00'} Months</p>
                  <p>Start Date: {new Date(agreements[0].start_date).toLocaleDateString()}</p>
                  <AppButton label='Details' onClick={() => history.push(`/orders/agreements/${agreements[0]._id}`)} block />
                </>
              )}
            </div>

            <div>
              <h5 style={{ marginLeft: '15px' }}>Today's Orders</h5>
              <hr />
            </div>
            {orders.length === 0 ? (
              <div className='details-card'>
                <p>No Orders</p>
              </div>
            ) : (
              <>
                {getTodaysOrders()}
              </>
            )}

            <div>
              <h5 style={{ marginLeft: '15px' }}>Most Recent Invoice</h5>
              <hr />
            </div>
            <div className='details-card'>
              {!invoices[0] ? (
                <p>No Invoice</p>
              ) : (
                <>
                  <p>{invoices[0].invoice_id}</p>
                  <p>Type: {invoices[0].type}</p>
                        <p>Invoice Date: {new Date(invoices[0].invoice_date).toLocaleDateString()}</p>
                    <p>Total: {invoices[0].total}</p>
                  <AppButton label='Invoice Details' onClick={() => history.push(`/orders/agreements/${agreements[0]._id}`)} block />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="details-column">
          <div className='details-list-container' style={{ paddingLeft: '30px' }}>
            <div className='details-list'>
              <div className='details-list-header'>
                <h4>Agreements</h4>
                <AppButton size='sm' label='' onClick={() => modal.show({ form: <AddAgreementForm /> })} icon={{ type: 'MaterialIcons', name: 'MdAddBox' }}>
                  <MdAddBox size={26} />
                </AppButton>
              </div>

              {agreements.length == 0 ? (
                <div className='details-card'>
                  <p>No Agreements</p>
                </div>
              ) : (
                <>
                  {agreements.map(u => {
                    return (
                      <div className='details-card'>
                        <p>{u.agreement_id}</p>
                        <p>{account!.account_name}</p>
                        <p>Remaining Term: {'00'} Months</p>
                        <p>Start Date: {new Date(agreements[0].start_date).toLocaleDateString()}</p>
                        <AppButton label='Agreement Details' onClick={() => history.push(`/orders/agreements/${agreements[0]._id}`)} block />
                      </div>
                    )
                  })
                  }
                </>)
              }
            </div>
          </div>
        </div>

        <div className="details-column">
          <div className='details-list-container'>
            <div className='details-list'>
              <div className='details-list-header'>
                <h4>Orders</h4>
                <AppButton size='sm' label='' onClick={() => modal.show({ form: <AddWorkOrderForm /> })}>
                  <MdAddBox size={26} />
                </AppButton>
              </div>

              {orders.length == 0 ? (
                <div className='details-card'>
                  <p>No Orders</p>
                </div>
              ) : (
                <>
                  {orders.map(u => {
                    return (
                      <div className='details-card'>
                        <p>{u.order_id}</p>
                        <p>Type: {u.is_demo ? 'Demo' : 'Recurring'}</p>
                        <p>Status: {u.order_status}</p>
                        <p>Service Date: {new Date(u.service_date).toLocaleDateString()}</p>
                        <p>{u.route_id}</p>
                        <AppButton label='Order Details' onClick={() => history.push(`/orders/orders/${u._id}`)} block />
                      </div>
                    )
                  })}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="details-column">
          <div className='details-list-container' style={{ paddingRight: '30px' }}>
            <div className='details-list'>
              <div className='details-list-header'>
                <h4>Invoices</h4>
                <AppButton size='sm' label='' onClick={() => modal.show({ form: <AddInvoiceForm /> })}>
                  <MdAddBox size={26} />
                </AppButton>
              </div>

              {invoices.length == 0 ? (
                <div className='details-card'>
                  <p>No Invoices</p>
                </div>
              ) : (
                <>
                  {invoices.map(u => {
                    return (
                      <div className='details-card'>
                        <p>{u.invoice_id}</p>
                        <p>Type: {u.type}</p>
                        <p>Invoice Date: {new Date(u.invoice_date).toLocaleDateString()}</p>
                        <p>Total: {u.total}</p>
                        <AppButton label='Invoice Details' onClick={() => history.push(`/invoices/invoices/${u._id}`)} block />
                      </div>
                    )
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      )
    }
    if (screen.detailFilter.find(u => u.selected === true)!.name === "Schedule") {
      return (
        <div className='details-row'>
          schedule
        </div>
      )
    }
    if (screen.detailFilter.find(u => u.selected === true)!.name === "Agreement History") {
      return (
        <div className='details-row'>
          agreement history
        </div>
      )
    }
  }

  return (
    <div style={{ height: "100%" }}>
      <AppTitle title='Account Details' />

      <div className="details-container">
        <div className="details-row">
          <div className="details-button-row">
            <AppButton
              label="Details"
              onClick={() => setBtnRowFilter('Details', 0)}
              outlined={!screen.detailFilter[0].selected}
              size='sm'
            />
            <AppButton
              label="Schedule"
              onClick={() => setBtnRowFilter('Details', 1)}
              outlined={!screen.detailFilter[1].selected}
              size='sm'
            />
            <AppButton
              label="Agreement History"
              onClick={() => setBtnRowFilter('Details', 2)}
              outlined={!screen.detailFilter[2].selected}
              size='sm'
            />
            <AppButton
              label="View Current Agreement"
              onClick={() => console.log("View Current Agreement")}
              secondary
              size='lg'
            />
          </div>
        </div>

        {renderDetailRow()}
      </div>
    </div>
  );
}

export default AccountDetailsScreen;
