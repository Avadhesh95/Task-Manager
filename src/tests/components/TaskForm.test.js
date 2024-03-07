import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskForm from "../../components/TaskForm";
import customRender from "../utils/customRender";

describe("TaskForm Component", () => {
  const mockSave = jest.fn();

  beforeEach(() => {
    mockSave.mockClear();
  });

  test("renders form fields correctly", () => {
    customRender(<TaskForm onSave={mockSave} dataToEdit={null} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/deadline/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  test("allows user to fill in and submit the form", () => {
    customRender(<TaskForm onSave={mockSave} dataToEdit={null} />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "New Description" },
    });
    fireEvent.change(screen.getByLabelText(/deadline/i), {
      target: { value: "2023-01-01" },
    });
    fireEvent.click(screen.getByText(/save/i));
  });

  test("pre-populates form when editing an existing task", () => {
    const existingTask = {
      name: "Existing Task",
      description: "Existing Description",
      deadline: "2023-02-01",
      status: "inprogress",
    };

    customRender(<TaskForm onSave={mockSave} dataToEdit={existingTask} />);

    expect(screen.getByLabelText(/name/i).value).toBe(existingTask.name);
    expect(screen.getByLabelText(/description/i).value).toBe(
      existingTask.description
    );
    expect(screen.getByLabelText(/deadline/i).value).toBe(
      existingTask.deadline
    );
  });
});
