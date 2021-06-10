import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../providers/AppContext";
import { isSuccessStatusCode } from "../../utils/Helpers";

const CrmList = () => {
  const { grpId, token } = useContext(AppContext);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    fetch(`${"http://localhost:3000"}/api/accountsBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          console.log(json.data);
          setAccounts(json.data);
        } else {
          // show
        }
      })
      .catch((err) => console.log(err));
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
              <tr key={u._id}>
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
