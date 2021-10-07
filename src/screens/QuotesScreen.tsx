import React, { useContext, useEffect, useRef, useState } from 'react';
import AppContentBox from '../components/layout/AppContentBox';
import AppDataTable from '../components/layout/AppDataTable';
import AppTitle from '../components/layout/AppTitle';
import AppContext from '../providers/AppContext';
import { ToastContext } from '../providers/ToastProvider';
import { Quote } from '../types';
import { isSuccessStatusCode } from '../utils/Helpers';

var $ = require('jquery');
$.DataTable = require('datatables.net');

const QuotesScreen = () => {
  const { grpId, token } = useContext(AppContext);
  const { show } = useContext(ToastContext);
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const dataTable = useRef<any>(null);

  useEffect(() => {
    getQuotes();
  }, []);

  const getQuotes = () => {
    fetch(`${process.env.REACT_APP_TCMC_URI}/api/quotesBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setData(json.data);
          if (dataTable) {
            dataTable.current = $("#table_id").DataTable({
              "scrollY": "300px",
              data: json.data.map((u: Quote) => {
                return {
                  id: u.objectID,
                  client: u.account_id,
                  location: u.location_id,
                  created: u.dateCreated,
                  valid: 'exp',
                  subtotal: 'dev',
                  total: 'dev',
                  label: 'dev',
                  scheduled: u.dateService ? u.dateService : 'dev'
                }
              }),
              columns: [
                { title: "ID", data: 'id' },
                { title: "Client", data: 'client' },
                { title: "Location", data: 'location' },
                { title: "Created", data: 'created' },
                { title: "Valid Until", data: 'valid' },
                { title: "Subtotal", data: 'subtotal'},
                { title: "Total", data: 'total'},
                { title: "Label", data: 'label'},
                { title: "Scheduled On", data: 'scheduled'}
              ]
            });
          }
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => {
        show({ message: err.message });
      });
  };

  return (
    <AppContentBox
      title='Quotes'
      data={data.map((quote: any) => {
        return {
          ["id to"]: quote._id,
          client: quote.account_name,
          location: `${quote.address.address_street} ${quote.address.address_city}, ${quote.address.address_state} ${quote.address.address_zip}`,
          created: quote.createdAt,
          valid: quote.updatedAt,
          subtotal: quote.email,
          total: quote.owner_name,
          label: quote.conversion,
          scheduled: quote._id
        }
      })}
    />
  );
}

export default QuotesScreen;