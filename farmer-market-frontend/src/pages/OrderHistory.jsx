import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './styles/OrderHistory.css'

function OrderHistory() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: token },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="order-history">
      <div className="container-div">
        <h1>Your Orders</h1>
        {console.log(orders)}
        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order">
              <h3>Order ID: {order._id}</h3>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Total: ${order.totalPrice}</p>

              <ul>
                {order.products.map((item) => (

                  < li key={item._id} >
                    {console.log(item)}
                    {item.name}

                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div >
  );
}

export default OrderHistory;
