import React from "react";
import { useContext } from "react";
import { ModalContext } from "../../providers/ModalProvider";
import { RouteContext } from "../../providers/RoutesProvider";
import AppButton from "../layout/AppButton";
import AddRouteForm from "./AddRouteForm";
import AddTruckForm from "./AddTruckForm";

interface Props {
  setSelected: any;
}

const RouteFilter: React.FC<Props> = ({ setSelected }) => {
  const { screen } = useContext(RouteContext);
  const { show } = useContext(ModalContext);

  const setFilter = (type: string, index: number) => {
    let newFilter = { ...screen.filter };

    if (type === "list") {
      newFilter.list.forEach((u: any) => (u.selected = false));
      newFilter.list[index].selected = true;
    }
    if (type === "calendar") {
      newFilter.calendar.forEach((u: any) => (u.selected = false));
      newFilter.calendar[index].selected = true;
    }
    if (type === "map") {
      newFilter.map.forEach((u: any) => (u.selected = false));
      newFilter.map[index].selected = true;
    }
    setSelected(newFilter);
  };
  
  return (
    <div className="app-tab">
      <div
        className={`app-tab-item ${
          screen.tabs[0].active === true ? "" : "hide"
        }`}
      >
        <div className="d-flex justify-content-center filter-btn">
          <AppButton
            label="Routes"
            onClick={() => setFilter("list", 0)}
            outlined={!screen.filter.list[0].selected}
            block
          />
        </div>
        <div className="d-flex justify-content-center filter-btn">
          <AppButton
            label="Trucks"
            onClick={() => setFilter("list", 1)}
            outlined={!screen.filter.list[1].selected}
            block
          />
        </div>
        <div className="d-flex justify-content-center filter-btn">
          <AppButton
            label="Drivers"
            onClick={() => setFilter("list", 2)}
            outlined={!screen.filter.list[2].selected}
            block
          />
        </div>
        <hr />
        <div className="d-flex justify-content-center filter-btn">
          <AppButton label="+ Add View" onClick={() => show({ form: <AddRouteForm /> })} block />
        </div>
        <div className="d-flex justify-content-center filter-btn">
          <AppButton label="Filter" onClick={() => null} block disabled />
        </div>
        <div className="d-flex justify-content-center filter-btn">
          <AppButton label="Create Route" onClick={() => show({ form: <AddRouteForm /> })} block />
        </div>
        <div className="d-flex justify-content-center filter-btn">
          <AppButton label="Create Truck" onClick={() => show({ form: <AddTruckForm /> })} block />
        </div>
      </div>

      <div
        className={`app-tab-item ${
          screen.tabs[1].active === true ? "" : "hide"
        }`}
      >
        <div className="d-flex justify-content-center filter-btn">
          <AppButton
            label="Route Events"
            onClick={() => setFilter("calendar", 0)}
            outlined={!screen.filter.calendar[0].selected}
            block
          />
          <AppButton
            label="All Events"
            onClick={() => setFilter("calendar", 1)}
            outlined={!screen.filter.calendar[1].selected}
            block
          />
        </div>
      </div>

      <div
        className={`app-tab-item ${
          screen.tabs[2].active === true ? "" : "hide"
        }`}
      >
        <div className="d-flex justify-content-center filter-btn">
          <AppButton
            label="All"
            onClick={() => setFilter("map", 0)}
            outlined={!screen.filter.map[0].selected}
            block
          />
        </div>
      </div>
    </div>
  );
};

export default RouteFilter;
