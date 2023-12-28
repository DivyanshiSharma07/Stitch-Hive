import React, { useState, useEffect } from 'react';
import './styles/TrackOrder.css';
import { useParams } from 'react-router-dom';

const TrackOrder = () => {
  const { email } = useParams();

  const [orderNumber, setOrderNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders for the customer using c_email
    fetch(`http://localhost:4000/orders/by-customer/${email}`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, [email]);

  const trackOrder = () => {
    const foundOrder = orders.find((order) => order.o_id === parseInt(orderNumber, 10));
  
    if (foundOrder) {
      setOrderStatus(foundOrder.o_status);
    } else {
      setOrderStatus('Order not found');
    }
  };

  return (
    <div className="order-tracking-container">
      <h2 className="order-tracking-heading">Track Your Order</h2>
      <div className="order-tracking-form">
        <input
          type="text"
          placeholder="Enter Order Number"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />
        <button className="track-button" onClick={trackOrder}>
          Track
        </button>
      </div>
      {orderStatus && (
        <div className="order-status">
          <h3>Order Status:</h3>
          <p>{orderStatus}</p>
        </div>
      )}

      <div className="customer-orders">
        <h3>Your Orders:</h3>
        <ul>
          {orders.map((order) => (
            <li key={order.o_id}>
              <p>Order ID: {order.o_id}</p>
              <p>Date: {order.o_date}</p>
              {/* <p>Status: {order.o_status}</p> */}
              <p>Items: {order.o_items}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrackOrder;