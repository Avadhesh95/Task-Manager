import React from "react";
import { render } from "@testing-library/react";
import { TaskProvider } from "../../context/TaskContext";

const customRender = (ui, options) =>
  render(ui, {
    wrapper: ({ children }) => <TaskProvider>{children}</TaskProvider>,
    ...options,
  });

export default customRender;
