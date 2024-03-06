import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskCard from "../../components/TaskCard";
import customRender from "../utils/customRender";

const mockTask = {
  id: 1,
  name: "Task 1",
  description: "Description of Task 1",
  deadline: "2022-12-31",
};

describe("TaskCard Component", () => {
  test("renders task details correctly", () => {
    customRender(
      <TaskCard task={mockTask} onEdit={() => {}} onDelete={() => {}} />
    );

    // Check if the task name and description are rendered
    expect(screen.getByText(mockTask.name)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();

    // Check if the formatted deadline is rendered
    const formattedDeadline = new Date(mockTask.deadline).toLocaleDateString();
    expect(
      screen.getByText(`Deadline: ${formattedDeadline}`)
    ).toBeInTheDocument();
  });

  test("calls onEdit when the Edit button is clicked", () => {
    const handleEdit = jest.fn();
    customRender(
      <TaskCard task={mockTask} onEdit={handleEdit} onDelete={() => {}} />
    );

    fireEvent.click(screen.getByText(/Edit/));
    expect(handleEdit).toHaveBeenCalledWith(mockTask);
  });

  test("calls onDelete when the Delete button is clicked", () => {
    const handleDelete = jest.fn();
    customRender(
      <TaskCard task={mockTask} onEdit={() => {}} onDelete={handleDelete} />
    );

    fireEvent.click(screen.getByText(/Delete/));
    expect(handleDelete).toHaveBeenCalledWith(mockTask.id);
  });
});
