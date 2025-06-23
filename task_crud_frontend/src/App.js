import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import LoginPage from "./components/LoginPage";

function App() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Router>
      <div className="container">
        <header>
          <h1>Gestion des Tâches</h1>

          <nav>
            <Link to="/">Liste</Link>
            <Link to="/add">Ajouter</Link>
            <button onClick={handleLogout} className="logout-btn">
              Déconnexion
            </button>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
