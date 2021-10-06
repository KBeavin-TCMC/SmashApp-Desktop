import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../components/header/AppHeader";
import Sidebar from "../components/layout/Sidebar";
import AppContext from "../providers/AppContext";
import AccountsScreen from "../screens/AccountsScreen";
import AdminScreen from "../screens/admin/AdminScreen";
import AgreementsScreen from "../screens/AgreementsScreen";
import ResetScreen from "../screens/auth/ResetScreen";
import BusinessUnitScreen from "../screens/BusinessUnitScreen";
import CorporateScreen from "../screens/CorporateScreen";
import AccountDetailsScreen from "../screens/crm/AccountDetailsScreen";
import CrmScreen from "../screens/header/CrmScreen";
import DashboardScreen from "../screens/header/DashboardScreen";
import InvoicesScreen from "../screens/header/InvoicesScreen";
import NoMatchScreen from "../screens/header/NoMatchScreen";
import OrdersScreen from "../screens/header/OrdersScreen";
import ReportsScreen from "../screens/header/ReportsScreen";
import RoutesScreen from "../screens/header/RoutesScreen";
import SettingsScreen from "../screens/header/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import InvoiceDetailsScreen from "../screens/invoices/InvoiceDetailsScreen";
import JobsScreen from "../screens/JobsScreen";
import LeadsScreen from "../screens/LeadsScreen";
import AgreementDetailsScreen from "../screens/orders/AgreementDetailsScreen";
import OrderDetailsScreen from "../screens/orders/OrderDetailsScreen";
import QuotesScreen from "../screens/QuotesScreen";
import RouteDetailsScreen from "../screens/routes/RouteDetailsScreen";
import TruckDetailsScreen from "../screens/routes/TruckDetailsScreen";
import UserDetailsScreen from "../screens/routes/UserDetails";
import SchedulesScreen from "../screens/SchedulesScreen";

const Navigation = () => {
  const {displayName} = useContext(AppContext);
  return (
    <Router>
      <AppHeader />
      <Sidebar />
      <div className='main-content'>
      <Switch>
        <Route path={["/", "/dashboard", "/home"]} component={HomeScreen} exact />
        <Route path='/quotes' component={QuotesScreen} />
        <Route path='/leads' component={LeadsScreen} />
        <Route path='/reset/:id' component={ResetScreen} />
        <Route path='/accounts' component={AccountsScreen} />
        <Route path='/jobs' component={JobsScreen} />
        <Route path='/schedules' component={SchedulesScreen} />
        <Route path="/invoices" component={InvoicesScreen} exact />
        <Route path="/agreements" component={AgreementsScreen} exact />
        <Route path="/reports" component={ReportsScreen} exact />
        <Route path="/business" component={BusinessUnitScreen} exact />
        <Route path="/corporate" component={CorporateScreen} exact />


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

        <Route path='/invoices/invoices/:id' component={InvoiceDetailsScreen} />


        {displayName === "Kyle Beavin" ?
          <Route path="/admin" component={AdminScreen} />
        : null}

        <Route component={NoMatchScreen} />
      </Switch>
      </div>
    </Router>
  );
};

export default Navigation;
