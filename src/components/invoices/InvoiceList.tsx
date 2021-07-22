import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { InvoiceContext } from "../../providers/InvoiceProvider";
import { Invoice } from "../../types/invoices";
import AppDropDown from "../layout/AppDropDown";

interface Props {
  invoices: Invoice[];
}

const InvoiceList: React.FC<Props> = ({ invoices }) => {
  let history = useHistory();
  const { screen, setPagination } = useContext(InvoiceContext);

  const getInvoiceDetails = (id: string) => {
    history.push(`/invoices/invoices/${id}`);
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
    return (
      <div className="table-container">
        <table className="col-12">
          <thead>
            <tr>
              <td className="col-1 td-checkbox">
                <input className="invisible" type="checkbox"></input>
              </td>
              <td className="col-3">Invoice</td>
              <td className="col-3">Account</td>
              <td className="col-3">Total</td>
              <td className="col-3">Date</td>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={5}>No Search Results</td>
              </tr>
            ) : (
              invoices.map((u: Invoice) => {
                return (
                  <tr key={u._id} onClick={() => getInvoiceDetails(u._id)}>
                    <td className="col-1 td-checkbox">
                      <input type="checkbox"></input>
                    </td>
                    <td className="col-3">{u.invoice_id}</td>
                    <td className="col-3">{u.account_id.account_name}</td>
                    <td className="col-3">{u.total.toString()}</td>
                    <td className="col-3">
                      {new Date(u.invoice_date).toLocaleDateString()}
                    </td>
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
  };
  
  return (
    <>
      {renderList()}
    </>
  );
};

export default InvoiceList;
