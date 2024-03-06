import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Paper,
} from "@material-ui/core";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { makeStyles } from "@material-ui/core/styles";
import { useTasks } from "../context/TaskContext";

const useStyles = makeStyles((theme) => ({
  headerSection: {
    backgroundColor: "#f0f0f0",
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
  taskGrid: {
    flexGrow: 1,
  },
}));

function HomePage() {
  const classes = useStyles();
  const { tasks, addTask, editTask, deleteTask } = useTasks();
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTask = (task, id = "") => {
    if (id !== "") {
      editTask(task);
      setOpen(false);
      return;
    } else {
      addTask(task);
      setOpen(false);
    }
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  return (
    <div>
      <Paper className={classes.headerSection}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">Task Board</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              className={classes.addButton}
            >
              Add Task
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TaskForm onSave={handleAddTask} dataToEdit={taskToEdit} />
        </DialogContent>
      </Dialog>

      <Grid container spacing={2} className={classes.taskGrid}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <TaskCard
              task={task}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default HomePage;
