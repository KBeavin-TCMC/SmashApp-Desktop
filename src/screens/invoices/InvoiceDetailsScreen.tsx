import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

import AppTitle from '../../components/layout/AppTitle';
import AppContext from '../../providers/AppContext';
import { Invoice } from '../../types/invoices';
import { isSuccessStatusCode } from '../../utils/Helpers';

const InvoiceDetailsScreen = () => {
    const { REACT_APP_TCMC_URI } = process.env;
    let params: {id: string} = useParams(); 
    const {grpId, token} = useContext(AppContext);
    const [invoice, setInvoice] = useState<Invoice>();

    useEffect(() => {
        const getInvoiceDetails = async () => {
            // TODO: set up dotenv and update uri.
            fetch(`${REACT_APP_TCMC_URI}/api/invoicesBy`, {
              method: "POST",
              headers: { "Content-type": "application/json", "x-access-token": token },
              body: JSON.stringify({ group_id: grpId, _id: params.id }),
            })
              .then((res) => res.json())
              .then((json) => {
                if (isSuccessStatusCode(json.status)) {
                  setInvoice(json.data);
                } else {
                  // show
                }
              })
              .catch((err) => {
                  // show
              });
          };
        getInvoiceDetails();
      }, [grpId, token, REACT_APP_TCMC_URI, params.id]);

    return (
        <div key={invoice?._id}>
          <AppTitle title={`Account: ${invoice?.invoice_id}`} />   
        </div>
    );
}

export default InvoiceDetailsScreen;