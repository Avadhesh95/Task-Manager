import React, { useEffect, useState } from "react";
import { Button, TextField, Paper, Typography } from "@material-ui/core";
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
  const [task, setTask] = useState({ name: "", description: "", deadline: "" });

  useEffect(() => {
    setTask(dataToEdit);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.name) return;
    if (dataToEdit) {
      onSave(task, dataToEdit.id);
      return;
    } else {
      onSave(task);
      setTask({ name: "", description: "", deadline: "" });
    }
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">Add New Task</Typography>
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <TextField
          id="name"
          label="name"
          name="name"
          value={task?.name}
          onChange={handleChange}
          required
        />
        <TextField
          id="description"
          label="Description"
          name="description"
          multiline
          // rows={1}
          value={task?.description}
          onChange={handleChange}
        />
        <TextField
          id="deadline"
          type="date"
          label="Deadline"
          name="deadline"
          InputLabelProps={{ shrink: true }}
          value={task?.deadline}
          onChange={handleChange}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.submitButton}
        >
          Save Task
        </Button>
      </form>
    </Paper>
  );
}

export default TaskForm;
