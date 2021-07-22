import { useState, useContext, useEffect } from "react";

import AppTabs from "../../components/layout/AppTabs";
import AppTitle from "../../components/layout/AppTitle";
import AppContext from "../../providers/AppContext";
import { isSuccessStatusCode } from "../../utils/Helpers";
import { ToastContext } from "../../providers/ToastProvider";
import { Order } from "../../types/orders";
import { RouteContext } from "../../providers/RoutesProvider";
import { Invoice } from "../../types/invoices";
import { InvoiceContext } from "../../providers/InvoiceProvider";
import InvoiceFilter from "../../components/invoices/InvoiceFilter";
import InvoiceList from "../../components/invoices/InvoiceList";
import InvoiceCalendar from "../../components/invoices/InvoiceCalendar";
import InvoiceMap from "../../components/invoices/InvoiceMap";

const InvoiceScreen = () => {
  const { REACT_APP_TCMC_URI } = process.env;
  const {screen, setFilter} = useContext(InvoiceContext);
  const { grpId, token, displayName } = useContext(AppContext);
  const {show} = useContext(ToastContext);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [pills, setPills] = useState<any>();


  useEffect(() => {
    getEvents();
    getInvoices();
  }, [screen]);

  const getInvoices = async () => {
    fetch(`${REACT_APP_TCMC_URI}/api/invoicesBy?page=${screen.pagination.page}&limit=${screen.pagination.limit}`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setInvoices(json.data);
        } else {
          show({message: json.message});
        }
      })
      .catch((err) => {
        show({message: err.message});
      });
  };

  const getEvents = async () => {
    let allEvents: {id: string, date: Date, type: string}[] = [];
    let invoiceEvents = await fetch(`${process.env.REACT_APP_TCMC_URI}/api/invoicesBy`, {
      method: 'POST',
      headers: {'Content-type': 'application/json', 'x-access-token': token},
      body: JSON.stringify({group_id: grpId, invoice_date: {
          $gte: screen.range.gte,
          $lt: screen.range.lt
        }
      })
    }).then(res => res.json());
    
    let demoEvents = await fetch(`${REACT_APP_TCMC_URI}/api/ordersBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({
        group_id: grpId, 
        is_demo: true
     }),
    }).then((res) => res.json());

    
    invoiceEvents.data.forEach((u: Invoice) => {
      allEvents.push({id: u._id, date: new Date(u.invoice_date), type: 'Invoice'})
    }); 

    demoEvents.data.forEach((u: Order) => {
      allEvents.push({id: u._id, date: new Date(u.service_date), type: 'Demo'})
    });
    
    setPills(allEvents);
  };

  const getFilteredInvoices = () => {
    if (screen.filter.list.filter(u => u.selected === true)[0].name === 'All Invoices') return invoices;
    
    if (screen.filter.list.filter(u => u.selected === true )[0].name === 'Outstanding') {
      return invoices.filter((u: any) => u.owner_name === displayName && u);
    }

    if (screen.filter.list.filter(u => u.selected === true )[0].name === 'Paid') {
      return invoices.filter((u: any) => {
        if (u.owner_name === 'Unassigned' || u.owner_name === null || u.owner_name === undefined) {
          return u;
        } 
        return null;
      });
    }
    return [];
  };

  const getFilteredEvents = () => {
    if (pills) {
      if (screen.filter.calendar.filter(u => u.selected === true)[0].name === 'All Events') return pills;
      if (screen.filter.calendar.filter(u => u.selected === true)[0].name === 'Invoice Events') {
        return pills.filter((u: any) => u.type === 'Invoice');
      }
    }
  };
  
  return (
    <>
      <AppTitle title="Invoices" />
      <AppTabs
        context={InvoiceContext}
        Filter={<InvoiceFilter setSelected={setFilter} />}
        List={<InvoiceList invoices={getFilteredInvoices()} />}
        Calendar={<InvoiceCalendar pills={getFilteredEvents()} />}
        Map={<InvoiceMap invoices={invoices} />}
      />
    </>
  );
};

export default InvoiceScreen;
