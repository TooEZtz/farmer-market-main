import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import FarmerDashboard from './pages/FarmerDashboard';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/user-dashboard"
                element={
                  <PrivateRoute userType="customer">
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/farmer-dashboard"
                element={
                  <PrivateRoute userType="farmer">
                    <FarmerDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <PrivateRoute userType="customer">
                    <ProductDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <PrivateRoute userType="customer">
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <PrivateRoute userType="customer">
                    <OrderHistory />
                  </PrivateRoute>
                }
              />
              {/* Add more routes as needed */}
            </Routes>
          </div>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

function PrivateRoute({ children, userType }) {
  const { token, userType: currentUserType } = React.useContext(AuthContext);
  if (!token || currentUserType !== userType) {
    return <Navigate to="/" />;
  }
  return children;
}

export default App;
