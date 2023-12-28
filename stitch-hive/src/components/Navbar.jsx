import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './images/logo.png';
import './styles/Navbar.css';

const Navbar = () => {
  const [loginDropdownVisible, setLoginDropdownVisible] = useState(false);
  const [registerDropdownVisible, setRegisterDropdownVisible] = useState(false);
  const location = useLocation(); // Get the current route location

  const handleLoginDropdownToggle = () => {
    setLoginDropdownVisible(!loginDropdownVisible);
  };

  const handleRegisterDropdownToggle = () => {
    setRegisterDropdownVisible(!registerDropdownVisible);
  };

  // Determine whether to show "Logout" based on the current route
  const showLogout = location.pathname.includes('/profile');
  const showLogoutIn = location.pathname.includes('/TrackOrder');
  const showLogoutF = location.pathname.includes('/feedback');

  // Define the handleLogout function to redirect to the homepage
  const handleLogout = () => {
    window.location.href = '/'; // Redirect to the homepage
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <span className="logo-text">Stitch-Hive</span>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/Services" className="nav-link">
            Services
          </Link>
          <Link to="/Tailor" className="nav-link">
            Tailors
          </Link>
          <Link to="/collaboration" className="nav-link">
            Collaboration
          </Link>
          <Link to="/Fashion-Insights" className="nav-link">
            Fashion Insights
          </Link>
        </div>

        {/* Conditional Rendering for Login/Register or Logout */}
        <div className="login-register">
          {showLogout || showLogoutIn || showLogoutF? (
            <div className="logout-link" onClick={handleLogout}>
            Logout
          </div>
          ) : (
            <>
              {/* Login Dropdown */}
              <div
                className="dropdown"
                onMouseEnter={handleLoginDropdownToggle}
                onMouseLeave={handleLoginDropdownToggle}
              >
                <div className="login-link">Login</div>
                {loginDropdownVisible && (
                  <div className="dropdown-content">
                    <Link to="/login/customer">Customer</Link>
                    <Link to="/login/admin">Admin</Link>
                    <Link to="/login/tailor">Tailor</Link>
                    <Link to="/login/boutique-owner">Boutique Owner</Link>
                  </div>
                )}
              </div>

              {/* Register Dropdown */}
              <div
                className="dropdown"
                onMouseEnter={handleRegisterDropdownToggle}
                onMouseLeave={handleRegisterDropdownToggle}
              >
                <div className="register-link">Register</div>
                {registerDropdownVisible && (
                  <div className="dropdown-content">
                    <Link to="/register/customer">Customer</Link>
                    <Link to="/register/tailor">Tailor</Link>
                    <Link to="/register/boutique-owner">Boutique Owner</Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


