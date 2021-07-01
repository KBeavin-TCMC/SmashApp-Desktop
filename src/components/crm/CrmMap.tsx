import React from 'react';
import { Account } from '../../types/crm';
import AppMapbox from '../layout/AppMapbox';

interface Props {
    accounts: Account[];
}

const CrmMap: React.FC<Props> = ({accounts}) => {
    return (
        <div style={{height: '100%'}}>
            <AppMapbox 
              points={accounts.map(u => {
                  return {
                      _id: u._id,
                      longitude: parseFloat(u.geo_location[0]),
                      latitude: parseFloat(u.geo_location[1])
                  }
              })}
            />
        </div>
    )
}

export default CrmMap;