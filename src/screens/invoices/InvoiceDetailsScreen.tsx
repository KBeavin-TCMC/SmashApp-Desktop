import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

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
        <div key={invoice?._id}>
          <AppTitle title={`Invoice: ${invoice?.invoice_id}`} />   
        </div>
    );
}

export default InvoiceDetailsScreen;