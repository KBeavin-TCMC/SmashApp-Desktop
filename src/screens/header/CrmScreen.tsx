import CrmList from "../../components/crm/CrmList";
import CrmCalendar from "../../components/crm/CrmCalendar";
import CrmMap from "../../components/crm/CrmMap";

import AppTabs from "../../components/layout/AppTabs";
import AppTitle from "../../components/layout/AppTitle";
import CrmFilter from "../../components/crm/CrmFilter";

const CrmScreen = () => {
  return (
    <>
      <AppTitle title="CRM" />
      <AppTabs
        Filter={<CrmFilter />}
        List={<CrmList />}
        Calendar={<CrmCalendar />}
        Map={<CrmMap />}
      />
    </>
  );
};

export default CrmScreen;
