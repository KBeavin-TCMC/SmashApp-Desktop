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

const CrmScreen = () => {
  const [filter, setFilter] = useState({
    list: [
      { name: 'Show All', selected: true},
      { name: 'Owned By Me', selected: false},
      { name: 'Unassigned', selected: false},
      { name: '+ Add View', selected: false},
      { name: 'Schedule Demo', selected: false},
      { name: 'Create Agreement', selected: false},
    ],
    calendar: {

    },
    map: {

    }
  });
  const { REACT_APP_TCMC_URI } = process.env;
  const { grpId, token, displayName } = useContext(AppContext);
  const {show} = useContext(ToastContext);
  const [accounts, setAccounts] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [demos, setDemos] = useState([]);
  const [pills, setPills] = useState<any>();

  const {addDays} = useDates();
  
  useEffect(() => {
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

      getAccounts();

      if (!pills || pills.length == 0) {
        getPills();
      }
  }, [
    grpId,
    token,
    REACT_APP_TCMC_URI,
    show,
    pills
    // addDays
  ]);

  const getMeetings = async () => {
    let selectedQuery = {
      group_id: grpId, 
      meeting_time: {
        // $gte: formatDate(new Date()),
        // $lt: addDays(new Date(), 1).toLocaleDateString(),
        $gte: '5/31/21',
        $lt: '7/5/21'
      },
   }
    fetch(`${REACT_APP_TCMC_URI}/api/meetingsBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify(selectedQuery),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setMeetings(json.data);
        } else {
          show({message: json.message});
        }
      })
      .catch((err) => {
        show({message: err.message});
      });
  };

  const getDemos = async () => {
    let selectedQuery = {
      group_id: grpId, 
      is_demo: true
   }
    fetch(`${REACT_APP_TCMC_URI}/api/ordersBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify(selectedQuery),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setDemos(json.data);
        } else {
          show({message: json.message});
        }
      })
      .catch((err) => {
        show({message: err.message});
      });
  };

  const getPills = async () => {
    let pills: {id: string, date: Date, type: string}[] = [];
    await getMeetings();
    await getDemos();
    
    if (meetings && meetings.length > 0) {
      meetings.forEach((u: Meeting) => {
        pills.push({id: u._id, date: new Date(u.meeting_time), type: 'Meeting'})
      });    
    }

    if (demos && demos.length > 0) {
      demos.forEach((u: Order) => {
        pills.push({id: u._id, date: new Date(u.service_date), type: 'Demo'})
      })
    }
    setPills([...pills]);

  };

  const getFilteredAccounts = () => {
    if (filter.list.filter(u => u.selected === true)[0].name === 'Show All') return accounts;
    
    if (filter.list.filter(u => u.selected === true )[0].name === 'Owned By Me') {
      return accounts.filter((u: any) => u.owner_name === displayName && u);
    }

    if (filter.list.filter(u => u.selected === true )[0].name === 'Unassigned') {
      return accounts.filter((u: any) => {
        if (u.owner_name === 'Unassigned' || u.owner_name === null || u.owner_name === undefined) {
          return u;
        } 
        return null;
      });
    }
  };

  return (
    <>
      <AppTitle title="CRM" />
      <AppTabs
        Filter={<CrmFilter filter={filter} setSelected={setFilter} />}
        List={<CrmList accounts={getFilteredAccounts()} />}
        Calendar={<CrmCalendar pills={pills} />}
        Map={<CrmMap />}
      />
    </>
  );
};

export default CrmScreen;
