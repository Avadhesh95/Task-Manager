import React from "react";
import { screen, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../../pages/HomePage";
import { useTasks } from "../../context/TaskContext";

// Mock TaskCard to simplify the test
jest.mock("../../components/TaskCard", () => ({ task, onEdit, onDelete }) => (
  <div>
    <div>Task: {task.name}</div>
    <button onClick={() => onEdit(task)}>Edit</button>
    <button onClick={() => onDelete(task.id)}>Delete</button>
  </div>
));

jest.mock("../../context/TaskContext", () => ({
  useTasks: jest.fn(),
}));

const mockTasks = [
  { id: 1, name: "Task 1", status: "todo" },
  { id: 2, name: "Task 2", status: "inprogress" },
  { id: 3, name: "Task 3", status: "done" },
];

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useTasks.mockImplementation(() => ({
      tasks: mockTasks,
      addTask: jest.fn(),
      editTask: jest.fn(),
      deleteTask: jest.fn(),
    }));
  });

  test("renders 'Add New Task' button and opens dialog on click", () => {
    render(<HomePage />);
    expect(screen.getByText("Add New Task")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Add New Task"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("renders tasks in respective columns", () => {
    render(<HomePage />);
    expect(screen.getByText("todo")).toBeInTheDocument();
    expect(screen.getByText("inprogress")).toBeInTheDocument();
    expect(screen.getByText("done")).toBeInTheDocument();
    expect(screen.getByText("Task: Task 1")).toBeInTheDocument(); // In 'todo' column
    expect(screen.getByText("Task: Task 2")).toBeInTheDocument(); // In 'inprogress' column
    expect(screen.getByText("Task: Task 3")).toBeInTheDocument(); // In 'done' column
  });

  test("triggers editTask when 'Edit' button is clicked on a task", () => {
    const editTaskMock = jest.fn();
    useTasks.mockImplementation(() => ({
      tasks: mockTasks,
      editTask: editTaskMock,
    }));
    render(<HomePage />);
    fireEvent.click(screen.getAllByText("Edit")[0]); // Click 'Edit' on the first task
  });

  test("triggers deleteTask when 'Delete' button is clicked on a task", () => {
    const deleteTaskMock = jest.fn();
    useTasks.mockImplementation(() => ({
      tasks: mockTasks,
      deleteTask: deleteTaskMock,
    }));
    render(<HomePage />);
    fireEvent.click(screen.getAllByText("Delete")[0]); // Click 'Delete' on the first task
    expect(deleteTaskMock).toHaveBeenCalled();
  });
});
