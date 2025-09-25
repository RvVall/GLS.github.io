import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ChatWidget from './components/Layout/ChatWidget';

// Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import Chapters from './pages/Chapters';
import Checkout from './pages/Checkout';
import Products from './pages/Products';
import Service from './pages/Service';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/chapters/:courseId" element={<Chapters />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/products" element={<Products />} />
              <Route path="/service" element={<Service />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;