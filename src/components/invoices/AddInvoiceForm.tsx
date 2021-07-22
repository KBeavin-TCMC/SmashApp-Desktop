import React, { useContext, useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import Colors from "../../constants/Colors";
import AppContext from "../../providers/AppContext";
import { ModalContext } from "../../providers/ModalProvider";
import { ToastContext } from "../../providers/ToastProvider";
import { Account } from "../../types/crm";
import { AddInvoice } from "../../types/invoices";
import { Order } from "../../types/orders";
import { isSuccessStatusCode } from "../../utils/Helpers";
import AppButton from "../layout/AppButton";
import AppDropDown from "../layout/AppDropDown";
import AppTextInput from "../layout/AppTextInput";

const AddInvoiceForm = () => {
  const { id, grpId, displayName, token } = useContext(AppContext);
  const { hide } = useContext(ModalContext);
  const { show } = useContext(ToastContext);
  const [account, setAccount] = useState("");
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [charges, setCharges] = useState<Charge[]>([]);
  const [invoiceDate, setInvoiceDate] = useState("");
  const [purchaseOrder, setPurchaseOrder] = useState("");
  const [orders, setOrders] = useState<string[]>([]);
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [subtotal, setSubtotal] = useState("");
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState("on-demand");
  const [status, setStatus] = useState("due");

  useEffect(() => {
    getAccountList();
  }, []);

  useEffect(() => {
    if (account != "") {
      getOrdersList();
    }
  }, [account]);

  useEffect(() => {
      let newSubTotal = 0;
      charges.forEach(u => newSubTotal = newSubTotal + u.charge.price);
      setSubtotal(newSubTotal.toString());
      setTotal(newSubTotal + ((tax * 0.01) * newSubTotal));
  }, [charges, tax]);

  const getOrdersList = async () => {
    await fetch(`${process.env.REACT_APP_TCMC_URI}/api/ordersBy`, {
      method: "POST",
      headers: { "Content-type": "application/json", "x-access-token": token },
      body: JSON.stringify({
        group_id: grpId,
        account_id: account,
        order_status: "completed",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setOrdersList(json.data);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => show({ message: err.message }));
  };

  const getAccountList = async () => {
    await fetch(`${process.env.REACT_APP_TCMC_URI}/api/accountsBy`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": token },
      body: JSON.stringify({ group_id: grpId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSuccessStatusCode(json.status)) {
          setAccountList(json.data);
          setAccount(json.data[0]._id);
        } else {
          show({ message: json.message });
        }
      })
      .catch((err) => show({ message: err.message }));
  };

  const getFormData = async () => {
    const newInvoice: AddInvoice = {
      _id: "",
      account_id: account,
      charges: [""],
      contact_id: id,
      group_id: grpId,
      invoice_date: invoiceDate,
      invoice_id: "",
      is_active: true,
      purchase_order: purchaseOrder,
      order_id: orders,
      subtotal: parseFloat(subtotal),
      tax: tax,
      total: total,
      type: type,
      status: status,
    };
    return newInvoice;
  };

  async function postNewInvoice() {
    const invoice = await getFormData();

    await fetch(`${process.env.REACT_APP_TCMC_URI}/api/invoices`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": token },
      body: JSON.stringify(invoice),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isSuccessStatusCode(data.status)) {
          show({ message: data.message });
          hide({});
        } else {
          show({ message: data.message });
        }
      })
      .catch((err) => show({ message: err.message }));
  }

  return (
    <div className="app-form">
      <div className="form-header">
        <div className="form-header-title">
          <h4>New Invoice</h4>
        </div>
        <div className="form-header-icon">
          <MdClose size={24} onClick={() => hide({})} />
        </div>
      </div>

      <div className="form-body" style={{ padding: 0 }}>
        <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
          <AppDropDown
            label="Account"
            value={account}
            onChange={setAccount}
            list={accountList.map((u) => {
              return { id: u._id, label: u.account_name, value: u._id };
            })}
          />
          <p className="small-label">NAME OF THE BUSINESS OR CLIENT</p>
        </div>
        <hr />
        <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
          <AppTextInput
            label="Invoice Date"
            value={invoiceDate}
            onChange={setInvoiceDate}
            type="date"
          />
        </div>
        <h4
          style={{
            color: Colors.SMT_Primary_2,
            paddingLeft: "15px",
            marginTop: "10px",
          }}
        >
          Item Charges
        </h4>
        <hr />
        <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
          {/* Charges */}
          {charges.map((u, i) => (
            <Charge key={i}
              charge={{id: i, qty: 0, price: 0}}
              charges={charges}
              ordersList={ordersList}
              setCharges={setCharges}
            />
          ))}

          {/* Button Row */}
          <div className='charges-button-row'>
            <AppButton label='Add From Work Order' onClick={() => setCharges([...charges,  {ordersList, charges, setCharges, charge: {id: charges.length, qty: 0, price: 0}}])} />
            <AppButton label='Add Without Work Order' onClick={() => console.log('Add Without Work Order')} outlined backgroundColor={Colors.SMT_Secondary_2_Light_1} />
            <AppButton label='Remove Items' onClick={() => setCharges([])} outlined secondary />
          </div>

          <AppTextInput
            label="Subtotal"
            value={subtotal}
            onChange={() => null}
            disabled
          />
          <AppTextInput label="Tax" value={tax.toString()} onChange={(val) => setTax(parseInt(val.toString()))} type='number' />

          <AppTextInput label="Total" value={total.toString()} onChange={() => null} disabled/>
        </div>
      </div>

      <div className="form-footer">
        <div className="footer-buttons">
          <AppButton label="Save" onClick={() => postNewInvoice()} />
          <AppButton
            size={"sm"}
            label="Cancel"
            onClick={() => hide({})}
            secondary
            outlined
          />
        </div>
      </div>
    </div>
  );
};

export default AddInvoiceForm;

interface Charge {
  ordersList: Order[];
  charge: {id: number, qty: number, price: number};
  charges: Charge[];
  setCharges: any;
}

const Charge: React.FC<Charge> = ({ordersList, charge, charges, setCharges}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [order, setOrder] = useState<Order>();
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  return (
    <div className="charge-container">
      {!isSelected ? (
        <>
          <div className="charge-item">
            <AppDropDown
              label="Work Order Name"
              value={ordersList}
              onChange={(val: string) => {
                setOrder(ordersList.find((u) => u._id === val));
                setIsSelected(true);
              }}
              list={ordersList.map((u) => {
                return { id: u._id, label: u.order_id, value: u._id };
              })}
            />
          </div>
          <div className="charge-item">
            <AppTextInput
              label="qty"
              value={""}
              onChange={() => {}}
              containerStyle={{ width: "60px" }}
              disabled
            />
          </div>
          <div className="charge-item">
            <AppTextInput
              label="price"
              value={""}
              onChange={() => null}
              disabled
            />
          </div>
        </>
      ) : (
        <>
          <div className="charge-item">
            <AppTextInput
              label="Work Order Name"
              value={order!.order_id}
              onChange={() => null}
              disabled
            />
          </div>
          <div className="charge-item">
            <AppTextInput
              label="qty"
              value={qty.toString()}
              onChange={(val) => {
                  let newCharges = charges;
                  setQty(parseInt(val.toString()));
                  setPrice(parseFloat(order!.demand_rate) * parseInt(val.toString()))
                  newCharges[charge.id] = {ordersList, charge: {id: charge.id, qty: parseInt(val.toString()), price: parseFloat(order!.demand_rate) * parseInt(val.toString())}, charges, setCharges};
                  setCharges([...newCharges]);
              }}
              type="number"
              containerStyle={{ width: "60px" }}
            />
          </div>
          <div className="charge-item">
            <AppTextInput
              label="price"
              value={price.toString()}
              onChange={() => null}
              disabled
            />
          </div>
        </>
      )}
    </div>
  );
};
