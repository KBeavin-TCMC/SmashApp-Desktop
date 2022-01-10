import React, { useContext, useEffect, useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';

import AppTitle from '../../components/layout/AppTitle';
import AppContext from '../../providers/AppContext';
import { ToastContext } from '../../providers/ToastProvider';
import { Order } from '../../types/orders';
import { isSuccessStatusCode } from '../../utils/Helpers';

const OrderDetailsScreen = (props: any) => {
    const { REACT_APP_TCMC_URI } = process.env;
    let route: any = useParams(); 
    const {grpId, token} = useContext(AppContext);
    const {show} = useContext(ToastContext);
    const [order, setOrder] = useState<Order>();

    useEffect(() => {
        const getOrderDetails = async () => {
            fetch(`${REACT_APP_TCMC_URI}/api/vordersBy`, {
              method: "POST",
              headers: { "Content-type": "application/json", "x-access-token": token },
              body: JSON.stringify({_id: route.id }),
            })
              .then((res) => res.json())
              .then((json) => {
                if (isSuccessStatusCode(json.status)) {
                  setOrder(json.data[0]);
                } else {
                  show({message: json.message});
                }
              })
              .catch((err) => {
                  show({message: err.message});
              });
          };
        getOrderDetails();
      }, [grpId, token, REACT_APP_TCMC_URI, route.id]);
      
    return (
        <div key={order?._id}>
          <AppTitle title={`Order: ${order?.order_id}`} />   
        </div>
    );
}

export default OrderDetailsScreen;