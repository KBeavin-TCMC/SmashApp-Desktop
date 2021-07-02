import React, { Dispatch, useState } from 'react';
import { SetStateAction } from 'react';
import { MdClose } from 'react-icons/md';
import { Point } from '../../types';
import { Account } from '../../types/crm';
import AppButton from '../layout/AppButton';
import AppMapbox from '../layout/AppMapbox';
import { useHistory } from "react-router-dom";


interface Props {
    accounts: Account[];
}

interface Props2 {
    account: Account;
    setSelectedLocation: Dispatch<SetStateAction<Point | null>>;
}

const CrmMap: React.FC<Props> = ({accounts}) => {
    const [selectedLocation, setSelectedLocation] = useState<Point| null>(null);

    return (
        <div style={{height: '100%'}}>
            <AppMapbox 
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              points={accounts.map(u => {
                  return {
                      _id: u._id,
                      longitude: parseFloat(u.geo_location[0]),
                      latitude: parseFloat(u.geo_location[1])
                  }
              })}
              popup={accounts.map((u: Account) => <AppPopup account={u} setSelectedLocation={setSelectedLocation} />)}
            />
        </div>
    )
}

const AppPopup: React.FC<Props2> = ({account, setSelectedLocation}) => {
    let history = useHistory();
    const getAccountDetails = (id: string) => {
        history.push(`/crm/accounts/${id}`);
      };

    return (
      <div
        id={account._id}
        className="app-map-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-image">
          <MdClose
            className="popup-close"
            size={24}
            onClick={() => setSelectedLocation(null)}
          />
        </div>

        <div className="popup-body">
          <div className="popup-col-1">
            <span>{account.account_name}</span>
            <h6>{account.address.address_street}</h6>
            <h6>{account.address.address_city}, {account.address.address_state} {account.address.address_zip}</h6>
          </div>
          <div className="popup-col-2">
            <p style={{ margin: 0 }}>00 Mi.</p>
            <div className="popup-btn">
              <AppButton label="Details" onClick={() => getAccountDetails(account._id)} />
            </div>
          </div>
        </div>
      </div>
    );
}

export default CrmMap;