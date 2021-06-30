import React from "react";
import { useHistory } from "react-router-dom";

interface Props {
  accounts: any;
}

const CrmList: React.FC<Props> = ({ accounts }) => {
  let history = useHistory();

  const getAccountDetails = (id: string) => {
    history.push(`/crm/accounts/${id}`);
  };

  return (
    <div className="table-container">
      <table className="col-12">
        <thead>
          <tr>
            <td className="col-1 td-checkbox">
              <input className='invisible' type="checkbox"></input>
            </td>
            <td className="col-3">Name</td>
            <td className="col-3">Owner</td>
            <td className="col-3">Create Date</td>
            <td className="col-3">_id</td>
          </tr>
        </thead>
        <tbody>
          {accounts.length === 0 ? (
            <tr>
              <td colSpan={5}>No Search Results</td>
            </tr>
          ) : (
            accounts.map((u: any) => {
              return (
                <tr key={u._id} onClick={() => getAccountDetails(u._id)}>
                  <td className="col-1 td-checkbox">
                    <input type="checkbox"></input>
                  </td>
                  <td className="col-3">{u.account_name}</td>
                  <td className="col-3">{u.owner_name}</td>
                  <td className="col-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="col-3">{u._id}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrmList;
