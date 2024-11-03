import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.css'

function Navbar() {
  const { token, userType, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to={userType === 'farmer' ? '/farmer-dashboard' : '/user-dashboard'} className="logo">
          Smart Farmer's Market
        </Link>
        <span>|</span>
        <p>Straight to Your Kitchen</p>
      </div>
      <div className="navbar-right">
        {userType === 'customer' && (
          <>
            <Link to="/cart">Cart({cart.length})</Link>
            <Link to="/orders">Your Orders</Link>
          </>
        )}
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/">Sign In</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
