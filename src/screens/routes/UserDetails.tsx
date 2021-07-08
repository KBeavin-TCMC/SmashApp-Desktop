import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

import AppTitle from '../../components/layout/AppTitle';
import AppContext from '../../providers/AppContext';
import { SMT_User } from '../../types';
import { isSuccessStatusCode } from '../../utils/Helpers';

const UserDetailsScreen = () => {
    const { REACT_APP_TCMC_URI } = process.env;
    let params: {id: string} = useParams(); 
    const {grpId, token} = useContext(AppContext);
    const [user, setUser] = useState<SMT_User>();

    useEffect(() => {
        const getUserDetails = async () => {
            // TODO: set up dotenv and update uri.
            fetch(`${REACT_APP_TCMC_URI}/api/usersBy`, {
              method: "POST",
              headers: { "Content-type": "application/json", "x-access-token": token },
              body: JSON.stringify({ group_id: grpId, _id: params.id }),
            })
              .then((res) => res.json())
              .then((json) => {
                if (isSuccessStatusCode(json.status)) {
                  setUser(json.data[0]);
                } else {
                  // show
                }
              })
              .catch((err) => {
                  // show
              });
          };
        getUserDetails();
      }, [grpId, token, REACT_APP_TCMC_URI, params.id]);

    return (
        <div key={user?._id}>
          <AppTitle title={`User: ${user?.first_name + ' ' + user?.last_name}`} />   
        </div>
    );
}

export default UserDetailsScreen;