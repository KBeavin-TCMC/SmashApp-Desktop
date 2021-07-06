import React from 'react';
import { useHistory } from "react-router-dom";
import { Order } from '../../types/orders';

interface Props {
  orders: Order[];
}

const OrderList: React.FC<Props> = ({orders}) => {
    let history = useHistory();

    const getOrderDetails = (id: string, item: Order) => {
      history.push(`/orders/orders/${id}`, item);
    };
    
    return (
        <div className="table-container">
        <table className="col-12">
          <thead>
            <tr>
              <td className="col-1 td-checkbox">
                <input className='invisible' type="checkbox"></input>
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
                  <tr key={u._id} onClick={() => getOrderDetails(u._id, u)}>
                    <td className="col-1 td-checkbox">
                      <input type="checkbox"></input>
                    </td>
                    <td className="col-3">{u.order_id}</td>
                    <td className="col-3">{u.account_id.account_name}</td>
                    <td className="col-3">{new Date(u.service_date).toLocaleDateString()}</td>
                    <td className="col-3">{u.is_demo.toString()}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    );
}

export default OrderList;