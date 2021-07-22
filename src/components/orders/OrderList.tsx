import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { OrderContext } from "../../providers/OrderProvider";
import { Agreement, Order } from "../../types/orders";
import AppDropDown from "../layout/AppDropDown";

interface Props {
  orders: Order[];
  agreements: Agreement[];
}

const OrderList: React.FC<Props> = ({ orders, agreements }) => {
  let history = useHistory();
  const { screen, setPagination } = useContext(OrderContext);

  const getOrderDetails = (id: string) => {
    history.push(`/orders/orders/${id}`);
  };

  const getAgreementDetails = (id: string) => {
    history.push(`/orders/agreements/${id}`);
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
      screen.filter.list.filter((u) => u.selected === true)[0].name ===
      "All Orders"
    ) {
      return (
        <div className="table-container">
          <table className="col-12">
            <thead>
              <tr>
                <td className="col-1 td-checkbox">
                  <input className="invisible" type="checkbox"></input>
                </td>
                <td className="col-3">Order</td>
                <td className="col-3">Account</td>
                <td className="col-3">Service Date</td>
                <td className="col-3">Demo</td>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5}>No Search Results</td>
                </tr>
              ) : (
                orders.map((u: Order) => {
                  return (
                    <tr key={u._id} onClick={() => getOrderDetails(u._id)}>
                      <td className="col-1 td-checkbox">
                        <input type="checkbox"></input>
                      </td>
                      <td className="col-3">{u.order_id}</td>
                      <td className="col-3">
                        {u.account_id ? u.account_id.account_name : "null"}
                      </td>
                      <td className="col-3">
                        {new Date(u.service_date).toLocaleDateString()}
                      </td>
                      <td className="col-3">{u.is_demo.toString()}</td>
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
    if (
      screen.filter.list.filter((u) => u.selected === true)[0].name ===
      "Agreements"
    ) {
      return (
        <div className="table-container">
          <table className="col-12">
            <thead>
              <tr>
                <td className="col-1 td-checkbox">
                  <input className="invisible" type="checkbox"></input>
                </td>
                <td className="col-3">Agreement</td>
                <td className="col-3">Account</td>
                <td className="col-3">End Date</td>
                <td className="col-3">Recurring</td>
              </tr>
            </thead>
            <tbody>
              {agreements.length === 0 ? (
                <tr>
                  <td colSpan={5}>No Search Results</td>
                </tr>
              ) : (
                agreements.map((u: Agreement) => {
                  return (
                    <tr key={u._id} onClick={() => getAgreementDetails(u._id)}>
                      <td className="col-1 td-checkbox">
                        <input type="checkbox"></input>
                      </td>
                      <td className="col-3">{u.agreement_id}</td>
                      <td className="col-3">
                        {u.account_id ? u.account_id.account_name : "null"}
                      </td>
                      <td className="col-3">
                        {new Date(u.end_date).toLocaleDateString()}
                      </td>
                      <td className="col-3">{u.is_recurring.toString()}</td>
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

  return <>{renderList()}</>;
};

export default OrderList;
