import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import TaskList from "./TaskList";
import api from "../api";

jest.mock("../api");

const mockTasks = [
  { id: 1, title: "Tâche 1", dueDate: "2025-07-01" },
  { id: 2, title: "Tâche 2", dueDate: "2025-07-15" },
];

describe("TaskList", () => {
  beforeEach(() => {
    api.get.mockResolvedValue({ data: mockTasks });
    api.delete.mockResolvedValue({});
  });

  test("affiche la liste des tâches", async () => {
    render(<TaskList />);
    await waitFor(() => {
      expect(screen.getByText("Tâche 2")).toBeInTheDocument();
    });
  });

  test("supprime une tâche", async () => {
    render(<TaskList />);
    const task = await screen.findByText("Tâche 1");
    expect(task).toBeInTheDocument();
    const deleteButtons = screen.getAllByRole("button", { name: /🗑️/ });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith("/1");
    });
  });
});
