import React, { useEffect, useState } from "react";
import AppButton from "../../components/layout/AppButton";
import AppTitle from "../../components/layout/AppTitle";
import { useHistory } from "react-router-dom";
import AppTextInput from "../../components/layout/AppTextInput";
import { PieChart } from "react-minimal-pie-chart";
import Colors from "../../constants/Colors";
import { MdCheckCircle, MdInfo } from "react-icons/md";

const DashboardScreen = () => {
  let history = useHistory();
  const [route, setRoute] = useState("");

  useEffect(() => {
    console.log(window.localStorage.getItem('smtUser'));
  }, []);

  return (
    <div className="app-dashboard-screen">
      <AppTitle title="Dashboard" />

      <div className="app-dashboard-container">
        <div className="dashboard-summary-column">
          {/* Summary Widget */}
          <div className="widget-container">
            <div className="widget-header">
              <h3>30 Day Summary</h3>
            </div>

            <div className="widget-body">
              <div className="dashboard-summary-widget">
                <div className="net-income-container">
                  <h5>Net Income:</h5>
                  <h5>${"0000000000.00"}</h5>
                </div>

                <div className="kpi-container">
                  <div className="kpi-row">
                    <div className="kpi-item">
                      <h5>Close Percentage</h5>
                      <h6>00%</h6>
                    </div>
                    <div className="kpi-item">
                      <h5>Average Time Per Smash</h5>
                      <h6>00:00</h6>
                    </div>
                  </div>
                  <div className="kpi-row">
                    <div className="kpi-item">
                      <h5>Demos Completed</h5>
                      <h6>00</h6>
                    </div>
                    <div className="kpi-item">
                      <h5>Smashes Per Hour</h5>
                      <h6>00</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}></div>
        </div>

        <div className="dashboard-widget-column">
          <div className="dashboard-widget-row">
            {/* Sales Events */}
            <div className="widget-container">
              <div
                className="widget-header"
                style={{ justifyContent: "space-between" }}
              >
                <h3>Sales Events</h3>
                <AppButton
                  label="View Schedule"
                  onClick={() => history.push(`/crm`)}
                />
              </div>

              <div className="widget-body">
                <ul className="sales-event-ul">
                  <li>
                    <b>{"Demo"}</b>
                    {" @ Account Name Here"}
                    <p>Today From 00:00 To 00:00</p>
                  </li>
                  <li>
                    <b>{"Agreement"}</b>
                    {" @ Account Name Here"}
                    <p>Ending Today At 00:00AM</p>
                  </li>
                  <li>
                    <b>{"Meeting"}</b>
                    {" @ Account Name Here"}
                    <p>Today From 00:00 To 00:00</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Today's Orders */}
            <div className="widget-container">
              <div
                className="widget-header"
                style={{ justifyContent: "space-between" }}
              >
                <h3>Today's Orders</h3>
                <AppButton
                  label="View Orders"
                  onClick={() => history.push(`/orders`)}
                />
              </div>

              <div className="widget-body">
                <div className="todays-orders-container">
                  <AppTextInput
                    label="CHOOSE ROUTE"
                    value={route}
                    onChange={(val) => setRoute(val)}
                    type="date"
                  />
                  <div className="todays-orders-graphs">
                    <div className="todays-orders-ul">
                      <ul>
                        <li></li>
                        <p>{"THIS IS A LABEL"}</p>
                        <li></li>
                        <p>{"THIS IS A LABEL"}</p>
                        <li></li>
                        <p>{"THIS IS A LABEL"}</p>
                      </ul>
                    </div>

                    <div className="todays-orders-pie">
                      <PieChart
                        style={{ height: "175px" }}
                        startAngle={60}
                        label={(labelRenderProps) =>
                          labelRenderProps.dataEntry.value
                        }
                        data={[
                          {
                            title: "One",
                            value: 4,
                            color: Colors.SMT_Primary_1_Light_1,
                          },
                          {
                            title: "Two",
                            value: 20,
                            color: Colors.SMT_Primary_1,
                          },
                          {
                            title: "Three",
                            value: 4,
                            color: Colors.SMT_Primary_1_Dark_1,
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Tracker */}
            <div className="widget-container">
              <div
                className="widget-header"
                style={{ justifyContent: "space-between" }}
              >
                <h3>Invoice Tracker</h3>
                <AppButton
                  label="View Invoices"
                  onClick={() => history.push(`/invoices`)}
                />
              </div>

              <div className="widget-body">
                <div className="invoice-tracker-container">
                  <div className="invoice-tracker-row">
                    <div className="invoice-tracker-item">
                      <div className="invoice-tracker-item-box">
                        <p>Needs</p>
                        <p>Review</p>
                        <h4>00</h4>
                      </div>
                      <AppButton
                        label="Details"
                        onClick={() => console.log("Details")}
                      />
                    </div>
                    <div className="invoice-tracker-item">
                      <div className="invoice-tracker-item-box">
                        <p>Sending</p>
                        <p>Today</p>
                        <h4>00</h4>
                      </div>
                      <AppButton
                        label="Details"
                        onClick={() => console.log("Details")}
                      />
                    </div>
                  </div>

                  <div className="invoice-tracker-row">
                    <div className="invoice-tracker-item">
                      <div className="invoice-tracker-item-box">
                        <p>Due</p>
                        <p>Now</p>
                        <h4>00</h4>
                      </div>
                      <AppButton
                        label="Details"
                        onClick={() => console.log("Details")}
                      />
                    </div>
                    <div className="invoice-tracker-item">
                      <div className="invoice-tracker-item-box">
                        <p>Late</p>
                        <p>Now</p>
                        <h4>00</h4>
                      </div>
                      <AppButton
                        label="Details"
                        onClick={() => console.log("Details")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-widget-row">
            {/* Franchise Status */}
            <div className="franchise-status">
              <div className="franchise-status-header">
                <h2>Franchise Status: </h2>
                <span>
                  <h2>On Track</h2>
                </span>
              </div>
              <div className="franchise-status-body">
                <div className="franchise-status-item">
                  <MdCheckCircle
                    style={{
                      fontSize: 38,
                      fontWeight: "bold",
                      color: Colors.SMT_Secondary_2_Light_1,
                    }}
                  />
                  <p>Something You're Doing Well At</p>
                </div>
                <div className="franchise-status-item">
                  <MdCheckCircle
                    style={{
                      fontSize: 38,
                      fontWeight: "bold",
                      color: Colors.SMT_Secondary_2_Light_1,
                    }}
                  />
                  <p>Something You're Doing Well At</p>
                </div>
                <div className="franchise-status-item">
                  <MdInfo
                    style={{
                      fontSize: 38,
                      fontWeight: "bold",
                      color: Colors.SMT_Primary_1_Light_1,
                    }}
                  />
                  <p>Something You Can Do Better</p>
                </div>
                <div className="franchise-status-item">
                  <MdInfo
                    style={{
                      fontSize: 38,
                      fontWeight: "bold",
                      color: Colors.SMT_Primary_1_Light_1,
                    }}
                  />
                  <p>Something You Can Do Better</p>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-widget-row">
            {/* Income Reports */}
            <div className="income-reports">
              <table>
                <thead>
                  <tr>
                    <td style={{backgroundColor: Colors.SMT_Secondary_2_Light_1}}><h4 style={{color: Colors.SMT_Tertiary_1}}>Income Reports</h4></td>
                    <td><h5>Gross Income</h5></td>
                    <td><h5>Expenses</h5></td>
                    <td><h5>Profits</h5></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Last Month</td>
                    <td>$ 00000000.00</td>
                    <td>$ 00000000.00</td>
                    <td>$ 00000000.00</td>
                  </tr>
                  <tr>
                    <td>Last Quarter</td>
                    <td>$ 00000000.00</td>
                    <td>$ 00000000.00</td>
                    <td>$ 00000000.00</td>
                  </tr>
                  <tr>
                    <td>Last Year</td>
                    <td>$ 00000000.00</td>
                    <td>$ 00000000.00</td>
                    <td>$ 00000000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
