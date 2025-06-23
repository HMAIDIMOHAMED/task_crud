import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import "../App.css";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/${id}`).then((res) => setTask(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({ ...task, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id ? api.put(`/${id}`, task) : api.post("/", task);
    request.then(() => navigate("/"));
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>{id ? "Modifier" : "Ajouter"} une tâche</h2>

      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        required
        placeholder="Titre"
        className="input"
      />

      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        className="input"
      />

      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        required
        className="input"
      />

      <label className="checkbox">
        <input
          type="checkbox"
          name="completed"
          checked={task.completed}
          onChange={handleChange}
        />
        Tâche terminée
      </label>

      <button type="submit" className="submit-btn">
        Enregistrer
      </button>
    </form>
  );
}

export default TaskForm;
