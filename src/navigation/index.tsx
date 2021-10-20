import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateAccountForm from "../components/forms/CreateAccountForm";
import CreateAgreementForm from "../components/forms/CreateAgreementForm";
import CreateInvoiceForm from "../components/forms/CreateInvoiceForm";
import CreateJobForm from "../components/forms/CreateJobForm";
import CreateLeadForm from "../components/forms/CreateLeadForm";
import CreateQuoteForm from "../components/forms/CreateQuoteForm";
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
// import InvoicesScreen from "../screens/header/InvoicesScreen";
import NoMatchScreen from "../screens/header/NoMatchScreen";
import OrdersScreen from "../screens/header/OrdersScreen";
import ReportsScreen from "../screens/header/ReportsScreen";
import RoutesScreen from "../screens/header/RoutesScreen";
import SettingsScreen from "../screens/header/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import InvoiceDetailsScreen from "../screens/invoices/InvoiceDetailsScreen";
import InvoicesScreen from "../screens/InvoicesScreen";
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
        <Route path='/quotes' component={QuotesScreen} exact />
        <Route path='/leads' component={LeadsScreen} exact />
        <Route path='/reset/:id' component={ResetScreen} exact />
        <Route path='/accounts' component={AccountsScreen} exact />
        <Route path='/jobs' component={JobsScreen} exact/>
        <Route path='/schedules' component={SchedulesScreen} />
        <Route path="/invoices" component={InvoicesScreen} exact />
        <Route path="/agreements" component={AgreementsScreen} exact />
        <Route path="/reports" component={ReportsScreen} exact />
        <Route path="/business" component={BusinessUnitScreen} exact />
        <Route path="/corporate" component={CorporateScreen} exact />

        <Route path="/jobs/create" component={CreateJobForm} exact />
        <Route path="/agreements/create" component={CreateAgreementForm} exact />
        <Route path="/quotes/create" component={CreateQuoteForm} exact />
        <Route path="/accounts/create" component={CreateAccountForm} exact />
        <Route path="/leads/create" component={CreateLeadForm} exact />
        <Route path="/invoices/create" component={CreateInvoiceForm} exact />

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
