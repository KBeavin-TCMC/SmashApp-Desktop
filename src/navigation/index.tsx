import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../components/header/AppHeader";
import AppContext from "../providers/AppContext";
import AdminScreen from "../screens/admin/AdminScreen";
import ResetScreen from "../screens/auth/ResetScreen";
import AccountDetailsScreen from "../screens/crm/AccountDetailsScreen";
import CrmScreen from "../screens/header/CrmScreen";
import DashboardScreen from "../screens/header/DashboardScreen";
import InvoicesScreen from "../screens/header/InvoicesScreen";
import NoMatchScreen from "../screens/header/NoMatchScreen";
import OrdersScreen from "../screens/header/OrdersScreen";
import ReportsScreen from "../screens/header/ReportsScreen";
import RoutesScreen from "../screens/header/RoutesScreen";
import SettingsScreen from "../screens/header/SettingsScreen";
import InvoiceDetailsScreen from "../screens/invoices/InvoiceDetailsScreen";
import AgreementDetailsScreen from "../screens/orders/AgreementDetailsScreen";
import OrderDetailsScreen from "../screens/orders/OrderDetailsScreen";
import RouteDetailsScreen from "../screens/routes/RouteDetailsScreen";
import TruckDetailsScreen from "../screens/routes/TruckDetailsScreen";
import UserDetailsScreen from "../screens/routes/UserDetails";

const Navigation = () => {
  const {displayName} = useContext(AppContext);
  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path={["/", "/dashboard"]} component={DashboardScreen} exact />
        
        <Route path='/reset/:id' component={ResetScreen} />

        <Route path="/settings" component={SettingsScreen} exact />

        <Route path="/crm" component={CrmScreen} exact />
        <Route path='/crm/accounts/:id' component={AccountDetailsScreen} />

        <Route path="/orders" component={OrdersScreen} exact />
        <Route path='/orders/orders/:id' component={OrderDetailsScreen} />
        <Route path='/orders/agreements/:id' component={AgreementDetailsScreen} />

        <Route path="/routes" component={RoutesScreen} exact />
        <Route path='/routes/routes/:id' component={RouteDetailsScreen} />
        <Route path='/routes/trucks/:id' component={TruckDetailsScreen} />
        <Route path='/routes/users/:id' component={UserDetailsScreen} />

        <Route path="/invoices" component={InvoicesScreen} exact />
        <Route path='/invoices/invoices/:id' component={InvoiceDetailsScreen} />

        <Route path="/reports" component={ReportsScreen} exact />

        {displayName === "Kyle Beavin" ?
          <Route path="/admin" component={AdminScreen} />
        : null}

        <Route component={NoMatchScreen} />
      </Switch>
    </Router>
  );
};

export default Navigation;
