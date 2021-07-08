import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

import AppTitle from '../../components/layout/AppTitle';
import AppContext from '../../providers/AppContext';
import { Route } from '../../types/routes';
import { isSuccessStatusCode } from '../../utils/Helpers';

const RouteDetailsScreen = () => {
    const { REACT_APP_TCMC_URI } = process.env;
    let params: {id: string} = useParams(); 
    const {grpId, token} = useContext(AppContext);
    const [route, setRoute] = useState<Route>();

    useEffect(() => {
        const getRouteDetails = async () => {
            // TODO: set up dotenv and update uri.
            fetch(`${REACT_APP_TCMC_URI}/api/routesBy`, {
              method: "POST",
              headers: { "Content-type": "application/json", "x-access-token": token },
              body: JSON.stringify({ group_id: grpId, _id: params.id }),
            })
              .then((res) => res.json())
              .then((json) => {
                if (isSuccessStatusCode(json.status)) {
                  setRoute(json.data[0]);
                } else {
                  // show
                }
              })
              .catch((err) => {
                  // show
              });
          };
        getRouteDetails();
      }, [grpId, token, REACT_APP_TCMC_URI, params.id]);

    return (
        <div key={route?._id}>
          <AppTitle title={`Route: ${route?.route_id}`} />   
        </div>
    );
}

export default RouteDetailsScreen;