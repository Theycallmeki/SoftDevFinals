import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CrudPage from "./pages/CrudPage";
import RecipePage from "./pages/RecipePage";
import BookmarksPage from "./pages/BookMarkPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./ProtectedRoute";

import { getMe, logout } from "./api/authApi";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register onRegister={setUser} />} />

        <Route path="/crud" element={<ProtectedRoute user={user}><CrudPage /></ProtectedRoute>} />
        <Route path="/recipes" element={<ProtectedRoute user={user}><RecipePage /></ProtectedRoute>} />
        <Route path="/bookmarks" element={<ProtectedRoute user={user}><BookmarksPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
