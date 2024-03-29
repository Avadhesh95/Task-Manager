import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginBottom: 5,
    marginTop: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    textAlign: "left",
    marginBottom: 13,
  },
  button: {
    margin: "0 4px",
  },
});

function TaskCard({ task, onEdit, onDelete }) {
  const classes = useStyles();
  const formattedDate = new Date(task?.deadline).toLocaleDateString();

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" component="h2">
              {task.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="textSecondary">
              Deadline: {formattedDate}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" component="p" className={classes.pos}>
          {task.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={() => onEdit(task)}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="secondary"
          variant="contained"
          className={classes.button}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default TaskCard;
