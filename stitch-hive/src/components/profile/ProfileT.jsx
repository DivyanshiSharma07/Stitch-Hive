
import React, { useState, useEffect } from 'react';
import './styles/ProfileT.css';
import Blogo from './styles/B.png';
import { Link, useParams } from 'react-router-dom';


const ProfileT = () => {
  const { email } = useParams(); // Get the email parameter from the URL

  const [profileData, setProfileData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState(''); // State to store the updated order status
  const [catalogImage, setCatalogImage] = useState(null);
  const [catalogDescription, setCatalogDescription] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4000/profile/tailor/${email}`)
      .then((response) => response.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.error('Error fetching profile:', error));
       
      // Fetch orders for the tailor using t_email
    fetch(`http://localhost:4000/orders/by-tailor/${email}`)
    .then((response) => response.json())
    .then((data) => setOrders(data))
    .catch((error) => console.error('Error fetching orders:', error));
// Fetch tailor's catalog data
    fetch(`http://localhost:4000/catalog/${email}`)
      .then((response) => response.json())
      .then((data) => {
        // Set the catalog image and description in state
        setCatalogImage(data.cat_image);
        setCatalogDescription(data.cat_desc);
      })
      .catch((error) => console.error('Error fetching catalog data:', error));
  }, [email]);

  const handleCatalogSubmit = () => {
    const formData = new FormData();
    formData.append('image', catalogImage);
    formData.append('description', catalogDescription);

    fetch(`http://localhost:4000/catalog/${email}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success if needed
        console.log('Catalog data uploaded successfully:', data);

        // Update the state variables to reflect that the catalog has been submitted
        setCatalogImage(null);
        setCatalogDescription('');
      })
      .catch((error) => console.error('Error uploading catalog data:', error));
  };

  const handleUpdateStatus = (orderId) => {
    // Send a PUT request to update the order status
    fetch(`http://localhost:4000/orders/${orderId}/update-status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ o_status: orderStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the local state with the updated order status
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.o_id === orderId ? { ...order, o_status: data.updatedStatus } : order
          )
        );
        setOrderStatus(''); // Clear the status input field
      })
      .catch((error) => console.error('Error updating order status:', error));
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Tailor Profile</h2>
      <div className="Boutique-info">
        <div className="Boutique-avatar">
          <img src={Blogo} alt="Logo" className="logo-image" />
        </div>
        <div className="profile-details">
          <h3>Tailor's Name</h3>
          <p>Email: {profileData.t_email}</p>
          <p>Phone: {profileData.t_contact}</p>
          <p>Location: {profileData.t_location}</p>
          <p>Experience: {profileData.t_experience}</p>
          <p>Specialization: {profileData.t_specialization}</p>
        </div>
      </div>


      <div className="orders-section">
        <h2>Orders</h2>
        {orders.map((order) => (
          <div key={order.o_id} className="order">
            <p>Order ID: {order.o_id}</p>
            <p>Date: {order.o_date}</p>
            <p>Status: {order.o_status}</p>
            <p>Items: {order.o_items}</p>
            <div>
              <input
                type="text"
                placeholder="Update Status"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              />
              <button onClick={() => handleUpdateStatus(order.o_id)}>Update</button>
            </div>
          </div>
        ))}
      </div>



      <div className="catalogue">
        <h3>{catalogImage ? 'Edit Catalogue' : 'Upload Catalogue'}</h3>
        <form>
          <h4>Upload an Image</h4>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCatalogImage(e.target.files[0])}
          />

          <h4>Description</h4>
          <textarea
            rows="4"
            cols="50"
            placeholder="Enter a description"
            value={catalogDescription}
            onChange={(e) => setCatalogDescription(e.target.value)}
          />

          {catalogImage ? (
            <button type="button" onClick={handleCatalogSubmit}>
              Edit
            </button>
          ) : (
            <button type="button" onClick={handleCatalogSubmit}>
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileT;
