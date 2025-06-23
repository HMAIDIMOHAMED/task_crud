import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "./TaskForm";
import api from "../api";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("../api");

describe("TaskForm", () => {
  test("affiche le formulaire d'ajout", () => {
    render(
      <MemoryRouter initialEntries={["/add"]}>
        <Routes>
          <Route path="/add" element={<TaskForm />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Titre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
  });

  test("soumet le formulaire d'ajout", async () => {
    api.post.mockResolvedValue({});
    const mockedNavigate = jest.fn();

    render(
      <MemoryRouter initialEntries={["/add"]}>
        <Routes>
          <Route path="/add" element={<TaskForm navigate={mockedNavigate} />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Titre"), {
      target: { value: "Nouvelle tâche" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Description tâche" },
    });
    fireEvent.change(screen.getByLabelText(/Date d'échéance/i), {
      target: { value: "2025-07-01" },
    });

    fireEvent.click(screen.getByText(/Enregistrer/i));

    expect(api.post).toHaveBeenCalledWith("/", expect.any(Object));
  });
});
