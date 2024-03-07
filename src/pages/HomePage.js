import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";

const useStyles = makeStyles((theme) => ({
  headerSection: {
    backgroundColor: "#f0f0f0",
    padding: theme.spacing(3),
    display: "flex", // Added for inline display of title and button
    justifyContent: "space-between", // Space between title and button
    alignItems: "center", // Vertically center content
    marginBottom: theme.spacing(4),
  },
  taskGrid: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  column: {
    padding: theme.spacing(2),
  },
}));

function HomePage() {
  const classes = useStyles();
  const { tasks, addTask, editTask, deleteTask } = useTasks();
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleOpen = () => {
    setTaskToEdit(null); // Reset task to edit
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddOrEditTask = (task) => {
    if (taskToEdit) {
      editTask(task);
      setTaskToEdit(null);
    } else {
      addTask(task);
    }
    setOpen(false);
  };

  const handleEditBtnClick = (task) => {
    setTaskToEdit(task);
    setOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const filterTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

  return (
    <div>
      <Paper className={classes.headerSection}>
        <Typography variant="h4">Task Board</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add New Task
        </Button>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TaskForm onSave={handleAddOrEditTask} dataToEdit={taskToEdit} />
        </DialogContent>
      </Dialog>

      <Grid container className={classes.taskGrid} spacing={2}>
        {["todo", "inprogress", "done"].map((status) => (
          <Grid item xs={12} md={4} key={status}>
            <Paper elevation={2} className={classes.column}>
              <Typography variant="h6" gutterBottom>
                {status}
              </Typography>
              {filterTasksByStatus(status).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditBtnClick}
                  onDelete={handleDeleteTask}
                />
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default HomePage;
