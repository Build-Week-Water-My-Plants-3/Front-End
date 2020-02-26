import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { TextField, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { red } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import { updateUser, deleteUser } from "../../store/actions/userActions";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 25,
    margin: "25px auto",
    width: "80%",
    maxWidth: 650
  },
  container: {
    display: "flex",
    justifyContent: "space-between"
  },
  button: {
    marginTop: 20
  },
  deleteButton: {
    backgroundColor: "red",
    marginTop: 20
  },
  title: {
    fontSize: 35,
    textAlign: "center"
  },
  textField: {
    margin: "10px auto"
  },
  nameTextField: {
    width: "60%"
  },
  monthTextField: {
    width: "35%"
  }
}));

const DeleteButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    "&:hover": {
      backgroundColor: red[800]
    }
  }
}))(Button);
const SettingsView = () => {
  const dispatch = useDispatch();
  const { info, name, tagline, month_at_job, id } = useSelector(
    state => state.userReducer.user
  );
  const updatedUser = useSelector(state => state.userReducer.updatedUser);
  const userFormData = { info, name, tagline, month_at_job };
  const [formData, setFormData] = useState(userFormData);
  const [snackOpen, setSnackOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setSnackOpen(updatedUser);
  }, [updatedUser]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateUser(id, formData));
  };

  const handleDelete = e => {
    e.preventDefault();
    console.log("Delete button clicked");
    dispatch(deleteUser(id));
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <Paper className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent
          message={<span id="client-snackbar">Updated Settings!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>

      <form onSubmit={handleSubmit}>
        <Typography className={classes.title} variant="h5" component="h3">
          Profile Settings
        </Typography>
        <div className={classes.container}>
          <TextField
            className={classes.nameTextField}
            label="Name"
            name="name"
            margin="normal"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            className={classes.monthTextField}
            label="Months At Job"
            type="number"
            name="month_at_job"
            margin="normal"
            onChange={handleChange}
            value={formData.month_at_job}
            variant="outlined"
          />
        </div>

        <TextField
          className={classes.textField}
          label="Tagline"
          fullWidth
          name="tagline"
          margin="normal"
          onChange={handleChange}
          value={formData.tagline}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          label="Info"
          fullWidth
          name="info"
          margin="normal"
          value={formData.info}
          onChange={handleChange}
          variant="outlined"
        />
        <Button
          className={classes.button}
          fullWidth
          type="submit"
          variant="contained"
          color="secondary"
        >
          Submit
        </Button>
        <DeleteButton
          className={classes.deleteButton}
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleDelete}
        >
          Delete
        </DeleteButton>
      </form>
    </Paper>
  );
};

export default SettingsView;
