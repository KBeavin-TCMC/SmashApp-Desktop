import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import AppContext from "../../providers/AppContext";
import { isSuccessStatusCode } from "../../utils/Helpers";

const CrmList = () => {
  let history = useHistory();
  const { REACT_APP_TCMC_URI } = process.env;

  const { grpId, token } = useContext(AppContext);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const getAccounts = async () => {
        fetch(`${REACT_APP_TCMC_URI}/api/accountsBy`, {
          method: "POST",
          headers: { "Content-type": "application/json", "x-access-token": token },
          body: JSON.stringify({ group_id: grpId }),
        })
          .then((res) => res.json())
          .then((json) => {
            if (isSuccessStatusCode(json.status)) {
              setAccounts(json.data);
            } else {
              // show
            }
          })
          .catch((err) => {
            // show
          });
      };
    getAccounts();
  }, [grpId, token]);

  const getAccountDetails = (id: string) => {
    history.push(`/crm/accounts/${id}`);
  };

  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
              <td></td>
            <td>Name</td>
            <td>Owner</td>
            <td>Create Date</td>
          </tr>
        </thead>
        <tbody>
          {accounts.map((u: any) => {
            return (
              <tr key={u._id} onClick={() => getAccountDetails(u._id)} >
                <td className='col-1' ><input type='checkbox'></input></td>
                <td className='col-3' >{u.account_name}</td>
                <td className='col-3' >{u.owner_name}</td>
                <td className='col-3' >{u.createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CrmList;
