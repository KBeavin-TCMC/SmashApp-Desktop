import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../components/header/AppHeader";
import CrmScreen from "../screens/header/CrmScreen";
import DashboardScreen from "../screens/header/DashboardScreen";
import InvoicesScreen from "../screens/header/InvoicesScreen";
import OrdersScreen from "../screens/header/OrdersScreen";
import ReportsScreen from "../screens/header/ReportsScreen";
import RoutesScreen from "../screens/header/RoutesScreen";
import SettingsScreen from "../screens/header/SettingsScreen";

const Navigation = () => {
  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/" exact>
          <DashboardScreen />
        </Route>
        <Route path="/settings" exact>
          <SettingsScreen />
        </Route>
        <Route path="/crm" exact>
          <CrmScreen />
        </Route>
        <Route path="/orders" exact>
          <OrdersScreen />
        </Route>
        <Route path="/routes" exact>
          <RoutesScreen />
        </Route>
        <Route path="/invoices" exact>
          <InvoicesScreen />
        </Route>
        <Route path="/reports" exact>
          <ReportsScreen />
        </Route>
      </Switch>
    </Router>
  );
};

export default Navigation;
