import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

import AppTitle from '../../components/layout/AppTitle';
import AppContext from '../../providers/AppContext';
import { Truck } from '../../types/routes';
import { isSuccessStatusCode } from '../../utils/Helpers';

const TruckDetailsScreen = () => {
    const { REACT_APP_TCMC_URI } = process.env;
    let params: {id: string} = useParams(); 
    const {grpId, token} = useContext(AppContext);
    const [truck, setTruck] = useState<Truck>();

    useEffect(() => {
        const getTruckDetails = async () => {
            // TODO: set up dotenv and update uri.
            fetch(`${REACT_APP_TCMC_URI}/api/truckBy`, {
              method: "POST",
              headers: { "Content-type": "application/json", "x-access-token": token },
              body: JSON.stringify({ group_id: grpId, _id: params.id }),
            })
              .then((res) => res.json())
              .then((json) => {
                if (isSuccessStatusCode(json.status)) {
                  setTruck(json.data[0]);
                } else {
                  // show
                }
              })
              .catch((err) => {
                  // show
              });
          };
        getTruckDetails();
      }, [grpId, token, REACT_APP_TCMC_URI, params.id]);

    return (
        <div key={truck?._id}>
          <AppTitle title={`Truck: ${truck?.name}`} />   
        </div>
    );
}

export default TruckDetailsScreen;