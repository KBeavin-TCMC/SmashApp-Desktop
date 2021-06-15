import { useState, useContext, useEffect } from "react";
import CrmList from "../../components/crm/CrmList";
import CrmCalendar from "../../components/crm/CrmCalendar";
import CrmMap from "../../components/crm/CrmMap";

import AppTabs from "../../components/layout/AppTabs";
import AppTitle from "../../components/layout/AppTitle";
import CrmFilter from "../../components/crm/CrmFilter";
import AppContext from "../../providers/AppContext";
import { isSuccessStatusCode } from "../../utils/Helpers";

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
  const [accounts, setAccounts] = useState([]);

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
              // show
            }
          })
          .catch((err) => {
            // show
          });
      };
    getAccounts();
  }, [grpId, token, REACT_APP_TCMC_URI]);

  const getFilteredAccounts = () => {
    if (filter.list.filter(u => u.selected === true)[0].name === 'Show All') return accounts;
    
    if (filter.list.filter(u => u.selected === true )[0].name === 'Owned By Me') {
      return accounts.filter((u: any) => u.owner_name === displayName && u);
    }

    if (filter.list.filter(u => u.selected === true )[0].name === 'Unassigned') {
      console.log(accounts.filter((u: any) => u.owner_name === 'Unassigned' || u.owner_name === null || u.owner_name === undefined && u));
      return accounts.filter((u: any) => u.owner_name === 'Unassigned' || u.owner_name === null || u.owner_name === undefined && u);
    }
  };

  return (
    <>
      <AppTitle title="CRM" />
      <AppTabs
        Filter={<CrmFilter filter={filter} setSelected={setFilter} />}
        List={<CrmList accounts={getFilteredAccounts()} />}
        Calendar={<CrmCalendar />}
        Map={<CrmMap />}
      />
    </>
  );
};

export default CrmScreen;
