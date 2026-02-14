import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddResource from './pages/AddResource';
import MyResources from './pages/MyResources';
import ResourceDetail from './pages/ResourceDetail';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/resource/:id" element={<ResourceDetail />} />
              <Route 
                path="/add-resource" 
                element={
                  <PrivateRoute>
                    <AddResource />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/my-resources" 
                element={
                  <PrivateRoute>
                    <MyResources />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;