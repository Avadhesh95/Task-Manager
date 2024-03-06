import React from "react";
import { screen, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../../pages/HomePage";
import { useTasks } from "../../context/TaskContext";

jest.mock("../../context/TaskContext", () => ({
  useTasks: jest.fn(),
}));

const mockTasks = [
  {
    id: 1,
    name: "Task 1",
    description: "Description of Task 1",
    deadline: "2022-12-31",
  },
  {
    id: 2,
    name: "Task 2",
    description: "Description of Task 2",
    deadline: "2023-01-15",
  },
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

  test("renders tasks correctly", () => {
    render(<HomePage />);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  test("opens dialog when 'Add Task' button is clicked", () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText(/Add Task/i));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("opens dialog with task details for editing when 'Edit' button is clicked", () => {
    render(<HomePage />);
    fireEvent.click(screen.getAllByText(/Edit/)[0]); // Click 'Edit' on the first task

    // Assuming the dialog contains inputs with values from the task to be edited
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i).value).toBe(mockTasks[0].name);
    expect(screen.getByLabelText(/Description/i).value).toBe(
      mockTasks[0].description
    );
    expect(screen.getByLabelText(/Deadline/i).value).toBe(
      mockTasks[0].deadline
    );
  });

  test("deletes task when 'Delete' button is clicked", () => {
    const deleteTaskMock = jest.fn();
    useTasks.mockImplementation(() => ({
      tasks: mockTasks,
      deleteTask: deleteTaskMock,
    }));

    render(<HomePage />);
    fireEvent.click(screen.getAllByText(/Delete/)[0]); // Click 'Delete' on the first task
    expect(deleteTaskMock).toHaveBeenCalledWith(mockTasks[0].id);
  });

  test("submits a new task when form in 'Add Task' dialog is submitted", () => {
    const addTaskMock = jest.fn();
    useTasks.mockImplementation(() => ({
      tasks: mockTasks,
      addTask: addTaskMock,
    }));

    render(<HomePage />);
    fireEvent.click(screen.getByText(/Add Task/i)); // Open 'Add Task' dialog

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "New Description" },
    });
    fireEvent.change(screen.getByLabelText(/Deadline/i), {
      target: { value: "2023-02-20" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Save Task/i));

    // Check if addTask was called with the new task details
    expect(addTaskMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "New Task",
        description: "New Description",
        deadline: "2023-02-20",
      })
    );
  });
});
