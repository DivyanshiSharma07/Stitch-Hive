import React, { useState, useEffect } from 'react';
import './styles/ProfileTforC.css';
import Blogo from './styles/B.png';
import { useParams, useNavigate } from 'react-router-dom';

const ProfileTforC = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  // const [orderData, setOrderData] = useState({ items: '', image: null });
  const [orderData, setOrderData] = useState({ items: '', image: '' });
  const [catalogData, setCatalogData] = useState({ cat_image: '', cat_desc: '' });

  const [customerEmail, setCustomerEmail] = useState(''); // State to store customer's email

  useEffect(() => {
    fetch(`http://localhost:4000/profile/tailor/${email}`)
      .then((response) => response.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.error('Error fetching profile:', error));
      fetch(`http://localhost:4000/catalog/${email}`)
      .then((response) => response.json())
      .then((data) => setCatalogData(data))
      .catch((error) => console.error('Error fetching catalog data:', error));
  }, [email]);

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    if (!profileData || !profileData.t_id) {
      console.error('t_id is null or undefined in profileData.');
      return;
    }

    // Fetch the c_id using the customer's email
    fetch(`http://localhost:4000/getCustomerId?email=${customerEmail}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.c_id) {
          // Now that you have the c_id, you can include it in your order data
          const formData = new FormData();
          formData.append('o_items', orderData.items);
          formData.append('image', orderData.image);
          formData.append('t_id', profileData.t_id); // Include t_id from profileData
          formData.append('c_id', data.c_id); // Include the fetched c_id
          
          fetch(`http://localhost:4000/orders`, {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              navigate('/order-success');
              console.log('Order submitted successfully:', data);
            })
            .catch((error) => {
              console.error('Error submitting order:', error);
            });
        } else {
          console.error('Customer ID not found for the provided email.');
        }
      })
      .catch((error) => {
        console.error('Error fetching customer ID:', error);
      });
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
          <h3>{profileData.t_fullname}</h3>
          <p>Email: {profileData.t_email}</p>
          <p>Phone: {profileData.t_contact}</p>
          <p>Location: {profileData.t_location}</p>
          <p>Experience: {profileData.t_experience}</p>
          <p>Specialization: {profileData.t_specialization}</p>
        </div>
      </div>
      <div className="catalog-details">
  <h2>Catalog</h2>
  <p>Description: {catalogData.cat_desc}</p>
  {catalogData.cat_image && (
    <div className="catalog-image">
      <img src={`data:image/jpeg;base64,${catalogData.cat_image}`} alt="Catalog" />
    </div>
  )}
</div>
      <form onSubmit={handleOrderSubmit}>
        <div className="order-form">
          <h2>Place Order</h2>
          <div>
            <label htmlFor="items">Order Items/Requirements:</label>
            <textarea
              id="items"
              name="items"
              value={orderData.items}
              onChange={(e) => setOrderData({ ...orderData, items: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => setOrderData({ ...orderData, image: e.target.files[0] })}
            />
          </div>
          <div>
            <label htmlFor="customerEmail">Enter Your Email:</label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Submit Order</button>
          </div>
        </div>
      </form>
     
    </div>
    
  );
};

export default ProfileTforC;