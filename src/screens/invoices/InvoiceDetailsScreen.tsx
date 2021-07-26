import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import AppButton from '../../components/layout/AppButton';

import AppTitle from '../../components/layout/AppTitle';
import AppContext from '../../providers/AppContext';
import { ModalContext } from '../../providers/ModalProvider';
import { Invoice } from '../../types/invoices';
import { isSuccessStatusCode } from '../../utils/Helpers';

const InvoiceDetailsScreen = () => {
    const { REACT_APP_TCMC_URI } = process.env;
    let params: {id: string} = useParams(); 
    const {grpId, token} = useContext(AppContext);
    const {show} = useContext(ModalContext);
    const [invoice, setInvoice] = useState<Invoice>();

    useEffect(() => {
        const getInvoiceDetails = async () => {
            fetch(`${REACT_APP_TCMC_URI}/api/invoicesBy`, {
              method: "POST",
              headers: { "Content-type": "application/json", "x-access-token": token },
              body: JSON.stringify({ group_id: grpId, _id: params.id }),
            })
              .then((res) => res.json())
              .then((json) => {
                if (isSuccessStatusCode(json.status)) {
                  setInvoice(json.data[0]);
                } else {
                  show({ message: json.message});
                }
              })
              .catch((err) => {
                  show({ message: err.message});
              });
          };
        getInvoiceDetails();
      }, [grpId, token, REACT_APP_TCMC_URI, params.id]);

    return (
      <div key={invoice?._id} style={{ height: "100%" }}>
        <AppTitle title={`Invoice: ${invoice?.invoice_id}`} />

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
                <h1>Details</h1>
                
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

export default InvoiceDetailsScreen;