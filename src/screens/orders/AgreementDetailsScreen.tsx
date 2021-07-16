import React, { useContext, useEffect, useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';

import AppTitle from '../../components/layout/AppTitle';
import AppContext from '../../providers/AppContext';
import { ToastContext } from '../../providers/ToastProvider';
import { Agreement, Order } from '../../types/orders';
import { isSuccessStatusCode } from '../../utils/Helpers';

const AgreementDetailsScreen = (props: any) => {
    const { REACT_APP_TCMC_URI } = process.env;
    let params: any = useParams(); 
    const {grpId, token} = useContext(AppContext);
    const {show} = useContext(ToastContext);
    const [agreement, setAgreement] = useState<Agreement>();

    useEffect(() => {
        const getAgreementDetails = async () => {
            fetch(`${REACT_APP_TCMC_URI}/api/agreementsBy`, {
              method: "POST",
              headers: { "Content-type": "application/json", "x-access-token": token },
              body: JSON.stringify({_id: params.id }),
            })
              .then((res) => res.json())
              .then((json) => {
                if (isSuccessStatusCode(json.status)) {
                  setAgreement(json.data[0]);
                } else {
                  show({message: json.message});
                }
              })
              .catch((err) => {
                  show({message: err.message});
              });
          };
        getAgreementDetails();
      }, [grpId, token, REACT_APP_TCMC_URI, params.id]);
      
    return (
        <div key={agreement?._id}>
          <AppTitle title={`Agreement: ${agreement?.agreement_id}`} />   
        </div>
    );
}

export default AgreementDetailsScreen;