import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <TaskProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
      </Router>
    </TaskProvider>
  );
}

export default App;
