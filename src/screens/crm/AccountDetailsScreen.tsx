import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

import AppTitle from '../../components/layout/AppTitle';
import AppContext from '../../providers/AppContext';
import { isSuccessStatusCode } from '../../utils/Helpers';

const AccountDetailsScreen = () => {
    const { REACT_APP_TCMC_URI } = process.env;
    let route: {id: string} = useParams(); 
    const {grpId, token} = useContext(AppContext);
    const [account, setAccount] = useState();

    useEffect(() => {
        const getAccountDetails = async () => {
            // TODO: set up dotenv and update uri.
            fetch(`${REACT_APP_TCMC_URI}/api/accountsBy`, {
              method: "POST",
              headers: { "Content-type": "application/json", "x-access-token": token },
              body: JSON.stringify({ group_id: grpId, _id: route.id }),
            })
              .then((res) => res.json())
              .then((json) => {
                if (isSuccessStatusCode(json.status)) {
                  setAccount(json.data);
                } else {
                  // show
                }
              })
              .catch((err) => {
                  // show
              });
          };
        getAccountDetails();
      }, [grpId, token, REACT_APP_TCMC_URI, route.id]);

    return (
        <div key={account}>
          <AppTitle title={`Account: ${route.id}`} />   
        </div>
    );
}

export default AccountDetailsScreen;