import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { RouteContext } from "../../providers/RoutesProvider";
import { SMT_User } from "../../types";
import { Route, Truck } from "../../types/routes";
import AppDropDown from "../layout/AppDropDown";

interface Props {
  routes: Route[];
  trucks: Truck[];
  drivers: SMT_User[];
}

const RouteList: React.FC<Props> = ({ routes, trucks, drivers }) => {
  let history = useHistory();
  const { screen, setPagination } = useContext(RouteContext);

  const getRouteDetails = (id: string) => {
    history.push(`/routes/routes/${id}`);
  };

  const getTruckDetails = (id: string) => {
    history.push(`/routes/trucks/${id}`);
  };

  const getDriverDetails = (id: string) => {
    history.push(`/routes/users/${id}`);
  };

  const setLimit = (val: any) => {
    setPagination({ page: screen.pagination.page, limit: val });
  };

  const setPage = (type: any) => {
    if (type === "lt") {
      if (screen.pagination.page - 1 < 0) return;
      setPagination({
        page: screen.pagination.page - 1,
        limit: screen.pagination.limit,
      });
    }
    if (type === "gt") {
      setPagination({
        page: screen.pagination.page + 1,
        limit: screen.pagination.limit,
      });
    }
  };

  const renderList = () => {
    if (
      screen.filter.list.filter((u) => u.selected === true)[0].name === "Routes"
    ) {
      return (
        <div className="table-container">
          <table className="col-12">
            <thead>
              <tr>
                <td className="col-1 td-checkbox">
                  <input className="invisible" type="checkbox"></input>
                </td>
                <td className="col-3">Route</td>
                <td className="col-3">Driver</td>
                <td className="col-3">Time</td>
                <td className="col-3">Stage</td>
              </tr>
            </thead>
            <tbody>
              {routes.length === 0 ? (
                <tr>
                  <td colSpan={5}>No Search Results</td>
                </tr>
              ) : (
                routes.map((u: Route) => {
                  return (
                    <tr key={u._id} onClick={() => getRouteDetails(u._id)}>
                      <td className="col-1 td-checkbox">
                        <input type="checkbox"></input>
                      </td>
                      <td className="col-3">{u.route_id}</td>
                      <td className="col-3">
                        {u.driver_id ? u.driver_id : "Not Assigned"}
                      </td>
                      <td className="col-3">
                        {new Date(u.time).toLocaleDateString()}
                      </td>
                      <td className="col-3">{u.route_stage.toString()}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <div className="pagination-container">
                    <span className="pagination-column">
                      <span className="pagination-dropdown">
                        <span
                          className="pagination-control"
                          onClick={() => setPage("lt")}
                        >
                          <span>&lt;</span>
                        </span>
                        <span className="pagination-control">
                          <span>{screen.pagination.page}</span>
                        </span>
                        <span
                          className="pagination-control"
                          onClick={() => setPage("gt")}
                        >
                          <span>&gt;</span>
                        </span>
                      </span>

                      <span className="pagination-dropdown">
                        <div style={{ flex: 1 }}>
                          <AppDropDown
                            label="limit"
                            value={screen.pagination.limit}
                            onChange={setLimit}
                            list={[
                              { id: "10", label: "10", value: "10" },
                              { id: "25", label: "25", value: "25" },
                              { id: "50", label: "50", value: "50" },
                              { id: "100", label: "100", value: "100" },
                            ]}
                            top
                          />
                        </div>
                      </span>
                    </span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    } 
    if (screen.filter.list.filter((u) => u.selected === true)[0].name === "Trucks") {
      return (
        <div className="table-container">
          <table className="col-12">
            <thead>
              <tr>
                <td className="col-1 td-checkbox">
                  <input className="invisible" type="checkbox"></input>
                </td>
                <td className="col-3">Name</td>
                <td className="col-3">Type</td>
                <td className="col-3">Year</td>
                <td className="col-3">Odometer</td>
              </tr>
            </thead>
            <tbody>
              {trucks.length === 0 ? (
                <tr>
                  <td colSpan={5}>No Search Results</td>
                </tr>
              ) : (
                trucks.map((u: Truck) => {
                  return (
                    <tr key={u._id} onClick={() => getTruckDetails(u._id)}>
                      <td className="col-1 td-checkbox">
                        <input type="checkbox"></input>
                      </td>
                      <td className="col-3">{u.name}</td>
                      <td className="col-3">
                        {u.vehicle_type}
                      </td>
                      <td className="col-3">
                        {u.year}
                      </td>
                      <td className="col-3">{u.odo}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <div className="pagination-container">
                    <span className="pagination-column">
                      <span className="pagination-dropdown">
                        <span
                          className="pagination-control"
                          onClick={() => setPage("lt")}
                        >
                          <span>&lt;</span>
                        </span>
                        <span className="pagination-control">
                          <span>{screen.pagination.page}</span>
                        </span>
                        <span
                          className="pagination-control"
                          onClick={() => setPage("gt")}
                        >
                          <span>&gt;</span>
                        </span>
                      </span>

                      <span className="pagination-dropdown">
                        <div style={{ flex: 1 }}>
                          <AppDropDown
                            label="limit"
                            value={screen.pagination.limit}
                            onChange={setLimit}
                            list={[
                              { id: "10", label: "10", value: "10" },
                              { id: "25", label: "25", value: "25" },
                              { id: "50", label: "50", value: "50" },
                              { id: "100", label: "100", value: "100" },
                            ]}
                            top
                          />
                        </div>
                      </span>
                    </span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }
    if (screen.filter.list.filter((u) => u.selected === true)[0].name === "Drivers") {
      return (
        <div className="table-container">
          <table className="col-12">
            <thead>
              <tr>
                <td className="col-1 td-checkbox">
                  <input className="invisible" type="checkbox"></input>
                </td>
                <td className="col-3">Name</td>
                <td className="col-3">Email</td>
                <td className="col-3">Role</td>
                <td className="col-3">Active</td>
              </tr>
            </thead>
            <tbody>
              {drivers.length === 0 ? (
                <tr>
                  <td colSpan={5}>No Search Results</td>
                </tr>
              ) : (
                drivers.map((u: SMT_User) => {
                  return (
                    <tr key={u._id} onClick={() => getDriverDetails(u._id)}>
                      <td className="col-1 td-checkbox">
                        <input type="checkbox"></input>
                      </td>
                      <td className="col-3">{u.first_name + ' ' + u.last_name}</td>
                      <td className="col-3">
                        {u.email}
                      </td>
                      <td className="col-3">
                        {u.role}
                      </td>
                      <td className="col-3">{u.is_active.toString()}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <div className="pagination-container">
                    <span className="pagination-column">
                      <span className="pagination-dropdown">
                        <span
                          className="pagination-control"
                          onClick={() => setPage("lt")}
                        >
                          <span>&lt;</span>
                        </span>
                        <span className="pagination-control">
                          <span>{screen.pagination.page}</span>
                        </span>
                        <span
                          className="pagination-control"
                          onClick={() => setPage("gt")}
                        >
                          <span>&gt;</span>
                        </span>
                      </span>

                      <span className="pagination-dropdown">
                        <div style={{ flex: 1 }}>
                          <AppDropDown
                            label="limit"
                            value={screen.pagination.limit}
                            onChange={setLimit}
                            list={[
                              { id: "10", label: "10", value: "10" },
                              { id: "25", label: "25", value: "25" },
                              { id: "50", label: "50", value: "50" },
                              { id: "100", label: "100", value: "100" },
                            ]}
                            top
                          />
                        </div>
                      </span>
                    </span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }
  };

  return (
    <>
      {renderList()}
    </>
  );
};

export default RouteList;
