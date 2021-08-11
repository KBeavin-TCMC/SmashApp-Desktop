import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AppContext from "../../providers/AppContext";
import { ToastContext } from "../../providers/ToastProvider";
import { Group } from "../../types";
import { isSuccessStatusCode } from "../../utils/Helpers";
import AppButton from "../layout/AppButton";

const CenterHeader = () => {
  const {grpArr, setGrpId, grpId, role, token, displayName} = useContext(AppContext);
  const {show} = useContext(ToastContext);
  const [grpName, setGrpName] = useState('');
  const [groupsList, setGroupsList] = useState<Group[]>([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (role === 'admin') {
      getGroupsList();
    } else {
      getGroupName();
    }
  }, []);
 
  const getGroupName = async () => {
    await fetch(`${process.env.REACT_APP_TCMC_URI}/api/groupsBy`, {
      method: 'POST',
      body: JSON.stringify({_id: grpId}),
      headers: {'Content-Type': 'application/json', 'x-access-token': token}
    })
      .then((res) => res.json())
        .then((json) => {console.log('grpname: ', json)
          if (isSuccessStatusCode(json.status)) {
            setGrpName(json.data.name);
          } else {
            show({message: json.message});
          }
        })
        .catch((err) => show({message: err.message}));
  };

  const getGroupsList = async () => {
    await fetch(`${process.env.REACT_APP_TCMC_URI}/api/groupsBy`, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {'Content-Type': 'application/json', 'x-access-token': token}
    })
      .then((res) => res.json())
        .then((json) => {
          if (isSuccessStatusCode(json.status)) {
            setGrpName(json.data.filter((group: Group) => group._id === grpId)[0].name)
            setGroupsList(json.data);
          } else {
            show({message: json.message});
          }
        })
        .catch((err) => show({message: err.message}));
  };
  
  return (
    <div className='center-header'>
      <div className='group-dropdown-container'>
        {role !== 'admin' ? (
          <AppButton
          label={grpName}
          onClick={() => null}
          secondary
          />
        ) : (
          <div className='group-dropdown'>
            <div className='group-button' onClick={() => setToggle(!toggle)}>
              <label>{grpName}</label>
            </div>

            {!toggle ? null : (
              <div className='group-item-container'>
                {groupsList.map(u => {
                  return (
                    <div key={u._id} className='item-wrapper' onClick={() => {
                        setToggle(!toggle);
                        setGrpId(u._id);
                        setGrpName(u.name);
                      }}
                    >
                      <label>{u.name}</label>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
      <div className='nav-link-container'>
        <NavLink activeClassName='is-active' className='header-link' to="/crm">
          Clients
          {/* <AppButton size={"sm"} label="CRM" onClick={() => null} /> */}
        </NavLink>
        <NavLink activeClassName='is-active' className='header-link' to="/orders">
          Orders
          {/* <AppButton size={"sm"} label="Orders" onClick={() => null} /> */}
        </NavLink>
        <NavLink activeClassName='is-active' className='header-link' to="/routes">
          Routes
          {/* <AppButton size={"sm"} label="Routes" onClick={() => null} /> */}
        </NavLink>
        <NavLink activeClassName='is-active' className='header-link' to="/invoices">
          Invoices
          {/* <AppButton size={"sm"} label="Invoices" onClick={() => null} /> */}
        </NavLink>
        {displayName === "Kyle Beavin" ?
          <NavLink activeClassName='is-active' className='header-link' to='/admin'>
            Admin
          </NavLink>
        : null}
      </div>
    </div>
  );
};

export default CenterHeader;
