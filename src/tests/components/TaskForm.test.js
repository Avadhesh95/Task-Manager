import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskForm from "../../components/TaskForm";
import customRender from "../utils/customRender";

const mockTaskData = {
  name: "Test Task",
  description: "Test Description",
  deadline: "2023-01-01",
};

describe("TaskForm Component", () => {
  test("renders form fields correctly", () => {
    customRender(<TaskForm onSave={() => {}} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/deadline/i)).toBeInTheDocument();
  });

  test("fills and submits the form correctly", () => {
    const handleSave = jest.fn();
    customRender(<TaskForm onSave={handleSave} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: mockTaskData.name },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: mockTaskData.description },
    });
    fireEvent.change(screen.getByLabelText(/deadline/i), {
      target: { value: mockTaskData.deadline },
    });

    fireEvent.click(screen.getByText(/save/i));
    expect(handleSave).toHaveBeenCalledWith({
      name: mockTaskData.name,
      description: mockTaskData.description,
      deadline: mockTaskData.deadline,
    });
  });
});
