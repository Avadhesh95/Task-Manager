import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Paper,
  Typography,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(3),
  },
  form: {
    width: "30vw",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
  },
  submitButton: {
    marginTop: theme.spacing(3),
  },
}));

function TaskForm({ onSave, dataToEdit }) {
  const classes = useStyles();
  const [task, setTask] = useState({
    name: "",
    description: "",
    deadline: "",
    status: "todo",
  });

  useEffect(() => {
    if (dataToEdit) {
      setTask(dataToEdit);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
    setTask({ name: "", description: "", deadline: "", status: "todo" });
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">Add New Task</Typography>
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <TextField
          label="Name"
          name="name"
          value={task.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          value={task.description}
          onChange={handleChange}
        />
        <TextField
          type="date"
          label="Deadline"
          name="deadline"
          InputLabelProps={{ shrink: true }}
          value={task.deadline}
          onChange={handleChange}
        />
        {/* Status select input */}
        <TextField
          select
          label="Status"
          name="status"
          value={task.status}
          onChange={handleChange}
          required
        >
          <MenuItem value="todo">Todo</MenuItem>
          <MenuItem value="inprogress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </TextField>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.submitButton}
        >
          Save
        </Button>
      </form>
    </Paper>
  );
}

export default TaskForm;
