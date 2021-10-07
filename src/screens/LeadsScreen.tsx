import React, { useContext, useEffect, useState } from 'react';
import AppContentBox from '../components/layout/AppContentBox';
import AppTitle from '../components/layout/AppTitle';
import AppContext from '../providers/AppContext';
import { ToastContext } from '../providers/ToastProvider';
import { isSuccessStatusCode } from '../utils/Helpers';

const LeadsScreen = () => {
  const { grpId, token } = useContext(AppContext);
  const { show } = useContext(ToastContext);
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_TCMC_URI}/api/accountsBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId}),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setData(json.data);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => {
        show({ message: err.message });
      });
  }, [])
  
    return (
      <AppContentBox
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
        title='Leads'
      />
    );
}

export default LeadsScreen;