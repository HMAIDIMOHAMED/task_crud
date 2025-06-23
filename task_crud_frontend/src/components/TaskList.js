import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import "../App.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/").then((res) => setTasks(res.data));
  }, []);

  const deleteTask = (id) => {
    api.delete(`/${id}`).then(() => setTasks(tasks.filter((t) => t.id !== id)));
  };

  return (
    <div className="list-container">
      <h2>Liste des tâches</h2>
      <Link to="/add" className="add-link">
        + Ajouter
      </Link>
      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t.id} className="task-item">
            <div>
              <strong>{t.title}</strong>
              <br />
              <small>Échéance : {t.dueDate}</small>
            </div>
            <div className="task-actions">
              <Link to={`/edit/${t.id}`} className="edit-btn">
                ✏️
              </Link>
              <button onClick={() => deleteTask(t.id)} className="delete-btn">
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
