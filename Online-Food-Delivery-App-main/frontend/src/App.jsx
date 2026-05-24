import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Lazy loading pages
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Restaurant = React.lazy(() => import('./pages/Restaurant'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Orders = React.lazy(() => import('./pages/Orders'));
const Payment = React.lazy(() => import('./pages/Payment'));
const Admin = React.lazy(() => import('./pages/Admin'));

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster position="bottom-right" />
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Suspense fallback={<Loader />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/restaurant/:id?" element={<Restaurant />} />

                  {/* Protected Routes (User) */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/payment" element={<Payment />} />
                  </Route>

                  {/* Protected Routes (Admin) */}
                  <Route element={<ProtectedRoute requireAdmin={true} />}>
                    <Route path="/admin" element={<Admin />} />
                  </Route>
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;