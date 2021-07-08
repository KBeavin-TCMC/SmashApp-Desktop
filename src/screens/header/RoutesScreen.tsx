import { useState, useContext, useEffect } from "react";

import AppTabs from "../../components/layout/AppTabs";
import AppTitle from "../../components/layout/AppTitle";
import AppContext from "../../providers/AppContext";
import { isSuccessStatusCode } from "../../utils/Helpers";
import { ToastContext } from "../../providers/ToastProvider";
import useDates from "../../hooks/useDates";
import { Meeting } from "../../types/crm";
import { Order } from "../../types/orders";
import { Route, Truck } from "../../types/routes";
import { RouteContext } from "../../providers/RoutesProvider";
import RouteMap from "../../components/routes/RouteMap";
import RouteCalendar from "../../components/routes/RouteCalendar";
import RouteList from "../../components/routes/RouteList";
import RouteFilter from "../../components/routes/RouteFilter";
import { SMT_User } from "../../types";

const RouteScreen = () => {
  const { REACT_APP_TCMC_URI } = process.env;
  const {screen, setFilter} = useContext(RouteContext);
  const { grpId, token, displayName } = useContext(AppContext);
  const {show} = useContext(ToastContext);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [drivers, setDrivers] = useState<SMT_User[]>([]);
  const [pills, setPills] = useState<any>();

  const {addDays} = useDates();

  useEffect(() => {
    getEvents();
    getRoutes();
    getTrucks();
    getDrivers();
  }, [screen]);

  const getRoutes = async () => {
    fetch(`${REACT_APP_TCMC_URI}/api/routesBy?page=${screen.pagination.page}&limit=${screen.pagination.limit}`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setRoutes(json.data);
        } else {
          show({message: json.message});
        }
      })
      .catch((err) => {
        show({message: err.message});
      });
  };

  const getTrucks = async () => {
    fetch(`${REACT_APP_TCMC_URI}/api/truckBy?page=${screen.pagination.page}&limit=${screen.pagination.limit}`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setTrucks(json.data);
        } else {
          show({message: json.message});
        }
      })
      .catch((err) => {
        show({message: err.message});
      });
  };

  const getDrivers = async () => {
    fetch(`${REACT_APP_TCMC_URI}/api/usersBy?page=${screen.pagination.page}&limit=${screen.pagination.limit}`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setDrivers(json.data);
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
    let routeEvents = await fetch(`${process.env.REACT_APP_TCMC_URI}/api/routesBy`, {
      method: 'POST',
      headers: {'Content-type': 'application/json', 'x-access-token': token},
      body: JSON.stringify({group_id: grpId, time: {
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

    
    routeEvents.data.forEach((u: Route) => {
      allEvents.push({id: u._id, date: new Date(u.time), type: 'Route'})
    }); 

    demoEvents.data.forEach((u: Order) => {
      allEvents.push({id: u._id, date: new Date(u.service_date), type: 'Demo'})
    });
    console.log(allEvents)
    setPills(allEvents);
  };

  const getFilteredRoutes = () => {
    if (screen.filter.list.filter(u => u.selected === true)[0].name === 'Routes') return routes;
    
    if (screen.filter.list.filter(u => u.selected === true )[0].name === 'Trucks') {
      return routes.filter((u: any) => u.owner_name === displayName && u);
    }

    if (screen.filter.list.filter(u => u.selected === true )[0].name === 'Drivers') {
      return routes.filter((u: any) => {
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
      
      if (screen.filter.calendar.filter(u => u.selected === true)[0].name === 'Route Events') {
        return pills.filter((u: any) => u.type === 'Route');
      }
    }
  };
  
  return (
    <>
      <AppTitle title="Routes" />
      <AppTabs
        context={RouteContext}
        Filter={<RouteFilter setSelected={setFilter} />}
        List={<RouteList routes={routes} trucks={trucks} drivers={drivers} />}
        Calendar={<RouteCalendar pills={getFilteredEvents()} />}
        Map={<RouteMap routes={routes} />}
      />
    </>
  );
};

export default RouteScreen;
