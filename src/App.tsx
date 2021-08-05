import React, { useContext, useEffect, useState } from "react";
import "./content/styles/App.css";

import AuthScreen from "./screens/auth/AuthScreen";
import AppContext from "./providers/AppContext";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./navigation/index";
import ToastProvider, { ToastContext } from "./providers/ToastProvider";
import ModalProvider from "./providers/ModalProvider";
import AppModal from "./components/layout/AppModal";
import CrmProvider from "./providers/CrmProvider";
import OrderProvider from "./providers/OrderProvider";
import RouteProvider from "./providers/RoutesProvider";
import InvoiceProvider from "./providers/InvoiceProvider";
import { isSuccessStatusCode } from "./utils/Helpers";
import AuthNavigation from "./navigation/auth";

const App = () => {
  const {show} = useContext(ToastContext);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState("");
  const [grpId, setGrpId] = useState("");
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [image, setImage] = useState("");
  const [grpArr, setGrpArr] = useState([]);

  const userSettings = {
    isAuth,
    token,
    grpId,
    id,
    displayName,
    grpArr,
    role,
    image,
    setDisplayName,
    setToken,
    setGrpId,
    setIsAuth,
    setId,
    setGrpArr,
    setRole,
    setImage,
  };

  useEffect(() => {
    setAppState()
  }, [])

  const setAppState = async () => {
    const json = window.localStorage.getItem('smtUser');
    if (json) {
      let smtUser = JSON.parse(json);
      setToken(smtUser.token);
      setGrpArr(smtUser.group_id);
      setGrpId(smtUser.group_id[0]);
      setId(smtUser._id);
      setDisplayName(smtUser.first_name + " " + smtUser.last_name);
      setRole(smtUser.role[0]);
      setImage(smtUser.image);

      await fetch(`${process.env.REACT_APP_TCMC_URI}/api/validateToken`, {
        method: 'POST',
        headers: {'Content-type': 'application/json', 'x-access-token': smtUser.token},
        body: JSON.stringify({token: smtUser.token})
      })
      .then(res => res.json())
      .then(json => {console.log('json: ', json)
        if (isSuccessStatusCode(json.status)) {
          return setIsAuth(true);
        } 
      })
      .catch(err => show({ message: err.message}));
    }
  };


  return (
    <div style={{height: '100%'}}>
      <AppContext.Provider value={userSettings}>
        <ModalProvider>
          <ToastProvider>
            <AppModal />
            <Router>
              {!isAuth ? (
                <AuthNavigation />
                // <AuthScreen />
              ) : (
                <CrmProvider>
                  <OrderProvider>
                    <RouteProvider>
                      <InvoiceProvider>
                        <Navigation />
                      </InvoiceProvider>
                    </RouteProvider>
                  </OrderProvider>
                </CrmProvider>
              )}
            </Router>
          </ToastProvider>
        </ModalProvider>
      </AppContext.Provider>
    </div>
  );
};

export default App;
