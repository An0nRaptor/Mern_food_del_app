import { useEffect } from "react";
import "./Orders.css";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { assets } from "../../assets/assets.js";

const Orders = () => {
  const url = "http://localhost:5000";

  const [ordersList, setOrdersList] = useState([]);

  const fetchAllOrders = async () => {
    const res = await axios.get(url + "/api/order/list");

    if (res.data.success) {
      setOrdersList(res.data.data);
    } else {
      toast.error("Error loading orders");
    }
  };

  const statusHandler = async (e, orderId) => {
    const res = await axios.post(url + "/api/order/status", {
      orderId,
      status: e.target.value,
    });

    if (res.data.success) {
      await fetchAllOrders();
      toast.success("Status Updated");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <>
      <Toaster />
      <div className="order add">
        <h3>Order Page</h3>
        <div className="order_list">
          {ordersList?.map((order, i) => {
            return (
              <div key={i} className="order_item">
                <img src={assets.parcel_icon} alt="itemImage" />
                <div>
                  <p className="order_item_food">
                    {order?.items?.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })}
                  </p>
                  <p className="order_item_name">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div className="order_item_address">
                    <span>{order.address.street + ","}</span>
                    <span>
                      {order.address.city +
                        ", " +
                        order.address.state +
                        ", " +
                        order.address.country +
                        ", " +
                        order.address.zipcode}
                    </span>
                  </div>
                  <p className="order_item_phone">{order.address.phone}</p>
                </div>
                <p>Items : {order.items.length}</p>
                <p>${order.amount}</p>
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Orders;
