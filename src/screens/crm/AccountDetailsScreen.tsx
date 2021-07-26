import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import AppButton from '../../components/layout/AppButton';

import AppTitle from '../../components/layout/AppTitle';
import AppContext from '../../providers/AppContext';
import { Account } from '../../types/crm';
import { isSuccessStatusCode } from '../../utils/Helpers';

const AccountDetailsScreen = () => {
    const { REACT_APP_TCMC_URI } = process.env;
    let params: {id: string} = useParams(); 
    const {grpId, token} = useContext(AppContext);
    const [account, setAccount] = useState<Account>();

    useEffect(() => {
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
                } else {
                  // show
                }
              })
              .catch((err) => {
                  // show
              });
          };
        getAccountDetails();
      }, [grpId, token, REACT_APP_TCMC_URI, params.id]);

    return (
      <div style={{ height: "100%" }}>
        <AppTitle title={`Account: ${account?.account_name}`} />

        <div className="details-container">
          <div className="details-row">
            <div className="details-button-row">
              <AppButton
                label="Details"
                onClick={() => console.log("Details")}
                outlined
                size='sm'
              />
              <AppButton
                label="Schedule"
                onClick={() => console.log("Schedule")}
                outlined
                size='sm'
              />
              <AppButton
                label="Agreement History"
                onClick={() => console.log("Agreement History")}
                outlined
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
          <div className="details-row">

            <div className="details-column">
              <div className='details-column-container'>
                <div className='details-column-header'>
                <h3>Details</h3>
                <p>{account?.account_name}</p>
                <p>{account?.address.address_street}</p>
                <p>{account?.address.address_city}, {account?.address.address_state + ' ' + account?.address.address_zip}</p>
                </div>
                <AppTitle title='Current Agreement' />
              </div>
            </div>

            <div className="details-column">
              <div className='details-list-container' style={{paddingLeft: '30px'}}>
                <div className='details-list'>
                  <div className='details-list-header'>
                    <h1>Agreements</h1>
                    <AppButton label='+' onClick={() => null} />
                  </div>
                </div>
              </div>
            </div>

            <div className="details-column">
            <div className='details-list-container'>
                <div className='details-list'>
                  <div className='details-list-header'>
                    <h1>Orders</h1>
                    <AppButton label='+' onClick={() => null} />
                  </div>
                </div>
              </div>
            </div>

            <div className="details-column">
            <div className='details-list-container' style={{paddingRight: '30px'}}>
                <div className='details-list'>
                  <div className='details-list-header'>
                    <h1>Invoices</h1>
                    <AppButton label='+' onClick={() => null} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default AccountDetailsScreen;