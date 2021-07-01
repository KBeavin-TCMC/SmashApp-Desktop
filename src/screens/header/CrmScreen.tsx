import { useState, useContext, useEffect } from "react";
import CrmList from "../../components/crm/CrmList";
import CrmCalendar from "../../components/crm/CrmCalendar";
import CrmMap from "../../components/crm/CrmMap";

import AppTabs from "../../components/layout/AppTabs";
import AppTitle from "../../components/layout/AppTitle";
import CrmFilter from "../../components/crm/CrmFilter";
import AppContext from "../../providers/AppContext";
import { formatDate, isSuccessStatusCode } from "../../utils/Helpers";
import { ToastContext } from "../../providers/ToastProvider";
import useDates from "../../hooks/useDates";
import { Meeting } from "../../types/crm";
import { Order } from "../../types/orders";
import { CrmContext } from "../../providers/CrmProvider";

const CrmScreen = () => {
  const { REACT_APP_TCMC_URI } = process.env;
  const {screen, setFilter} = useContext(CrmContext);
  const { grpId, token, displayName } = useContext(AppContext);
  const {show} = useContext(ToastContext);
  const [accounts, setAccounts] = useState([]);
  const [pills, setPills] = useState<any>();

  const {addDays} = useDates();

  useEffect(() => {
    getEvents();
    getAccounts();
  }, []);

  const getAccounts = async () => {
    fetch(`${REACT_APP_TCMC_URI}/api/accountsBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setAccounts(json.data);
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
    let meetingEvents = await fetch(`${process.env.REACT_APP_TCMC_URI}/api/meetingsBy`, {
      method: 'POST',
      headers: {'Content-type': 'application/json', 'x-access-token': token},
      body: JSON.stringify({group_id: grpId, meeting_time: {
          // $gte: formatDate(new Date()),
          // $lt: addDays(new Date(), 1).toLocaleDateString(),
          $gte: '5/31/21',
          $lt: '7/5/21'
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

    
    meetingEvents.data.forEach((u: Meeting) => {
      allEvents.push({id: u._id, date: new Date(u.meeting_time), type: 'Meeting'})
    }); 

    demoEvents.data.forEach((u: Order) => {
      allEvents.push({id: u._id, date: new Date(u.service_date), type: 'Demo'})
    });

    setPills(allEvents);
  };

  const getFilteredAccounts = () => {
    if (screen.filter.list.filter(u => u.selected === true)[0].name === 'Show All') return accounts;
    
    if (screen.filter.list.filter(u => u.selected === true )[0].name === 'Owned By Me') {
      return accounts.filter((u: any) => u.owner_name === displayName && u);
    }

    if (screen.filter.list.filter(u => u.selected === true )[0].name === 'Unassigned') {
      return accounts.filter((u: any) => {
        if (u.owner_name === 'Unassigned' || u.owner_name === null || u.owner_name === undefined) {
          return u;
        } 
        return null;
      });
    }
  };

  const getFilteredEvents = () => {
    if (pills) {
      if (screen.filter.calendar.filter(u => u.selected === true)[0].name === 'All Events') return pills;
      
      if (screen.filter.calendar.filter(u => u.selected === true)[0].name === 'Crm Events') {
        return pills.filter((u: any) => u.type === 'Meeting');
      }
    }
  };
  
  return (
    <>
      <AppTitle title="CRM" />
      <AppTabs
        Filter={<CrmFilter setSelected={setFilter} />}
        List={<CrmList accounts={getFilteredAccounts()} />}
        Calendar={<CrmCalendar pills={getFilteredEvents()} />}
        Map={<CrmMap accounts={accounts} />}
      />
    </>
  );
};

export default CrmScreen;
