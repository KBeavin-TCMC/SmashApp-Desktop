import React, { useState } from "react";
import "./content/styles/App.css";

import AuthScreen from "./screens/auth/AuthScreen";
import AppContext from "./providers/AppContext";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./navigation/index";
import ToastProvider from "./providers/ToastProvider";
import ModalProvider from "./providers/ModalProvider";
import AppModal from "./components/layout/AppModal";
import CrmProvider from "./providers/CrmProvider";
import OrderProvider from "./providers/OrderProvider";
import RouteProvider from "./providers/RoutesProvider";
import InvoiceProvider from "./providers/InvoiceProvider";

const App = () => {
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

  return (
    <div>
      <AppContext.Provider value={userSettings}>
        <ModalProvider>
          <ToastProvider>
            <AppModal />
            <Router>
              {!isAuth ? (
                <AuthScreen />
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
