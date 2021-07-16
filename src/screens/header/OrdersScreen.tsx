import React, { useContext, useEffect, useState } from "react";
import AppTabs from "../../components/layout/AppTabs";
import AppTitle from "../../components/layout/AppTitle";
import OrderCalendar from "../../components/orders/OrderCalendar";
import OrderFilter from "../../components/orders/OrderFilter";
import OrderList from "../../components/orders/OrderList";
import OrderMap from "../../components/orders/OrderMap";
import AppContext from "../../providers/AppContext";
import { OrderContext } from "../../providers/OrderProvider";
import { ToastContext } from "../../providers/ToastProvider";
import { Agreement, Order } from "../../types/orders";
import { Route } from "../../types/routes";
import { isSuccessStatusCode } from "../../utils/Helpers";

const OrdersScreen = () => {
  const { REACT_APP_TCMC_URI } = process.env;
  const { screen, setFilter } = useContext(OrderContext);
  const { grpId, token } = useContext(AppContext);
  const { show } = useContext(ToastContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [pills, setPills] = useState<any>();

  useEffect(() => {
    getEvents();
    getOrders();
    getAgreements();
  }, [screen]);

  const getOrders = async () => {
    fetch(`${REACT_APP_TCMC_URI}/api/ordersBy?page=${screen.pagination.page}&limit=${screen.pagination.limit}`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setOrders(json.data);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => {
        show({ message: err.message });
      });
  };

  const getAgreements = async () => {
    fetch(`${REACT_APP_TCMC_URI}/api/agreementsBy?page=${screen.pagination.page}&limit=${screen.pagination.limit}`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setAgreements(json.data);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => {
        show({ message: err.message });
      });
  };

  const getEvents = async () => {
    let allEvents: { id: string; date: Date; type: string }[] = [];
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
        is_demo: true,
      }),
    }).then((res) => res.json());

    routeEvents.data.forEach((u: Route) => {
      allEvents.push({id: u._id, date: new Date(u.time), type: 'Route'})
    });

    demoEvents.data.forEach((u: Order) => {
      allEvents.push({
        id: u._id,
        date: new Date(u.service_date),
        type: "Demo",
      });
    });

    setPills(allEvents);
  };

  const getFilteredOrders = () => {
    if (
      screen.filter.list.filter((u) => u.selected === true)[0].name ===
      "All Orders"
    )
      return orders;

    if (
      screen.filter.list.filter((u) => u.selected === true)[0].name ===
      "Assigned"
    ) {
      return orders.filter((u: Order) => u.route_id !== null && u);
    }

    if (
      screen.filter.list.filter((u) => u.selected === true)[0].name ===
      "Unassigned"
    ) {
      return orders.filter((u: Order) => {
        if (u.route_id === null) {
          return u;
        }
        return null;
      });
    }
    return [];
  };

  const getFilteredEvents = () => {
    if (pills) {
      if (
        screen.filter.calendar.filter((u) => u.selected === true)[0].name ===
        "All Events"
      )
        return pills;

      if (
        screen.filter.calendar.filter((u) => u.selected === true)[0].name ===
        "Order Events"
      ) {
        return pills.filter((u: any) => u.type === "Demo");
      }
    }
  };

  return (
    <>
      <AppTitle title="Orders" />
      <AppTabs
        context={OrderContext}
        Filter={<OrderFilter setSelected={setFilter} />}
        List={<OrderList orders={getFilteredOrders()} agreements={agreements}/>}
        Calendar={<OrderCalendar pills={getFilteredEvents()} />}
        Map={<OrderMap orders={getFilteredOrders()} />}
      />
    </>
  );
};

export default OrdersScreen;
