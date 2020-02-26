import React, { useState } from "./node_modules/react";
import { Link, withRouter } from './node_modules/react-router-dom';
import Avatar from "./node_modules/@material-ui/core/Avatar";
import Button from "./node_modules/@material-ui/core/Button";
import CssBaseline from "./node_modules/@material-ui/core/CssBaseline";
import TextField from "./node_modules/@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
import Grid from "./node_modules/@material-ui/core/Grid";
import Box from "./node_modules/@material-ui/core/Box";
import LockOutlinedIcon from "./node_modules/@material-ui/icons/LockOutlined";
import Typography from "./node_modules/@material-ui/core/Typography";
import { makeStyles } from "./node_modules/@material-ui/core/styles";
import Container from "./node_modules/@material-ui/core/Container";
import { Redirect } from "./node_modules/react-router-dom";
import { useDispatch, useSelector } from "./node_modules/react-redux";
import { login } from "../../store/actions/userActions";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
    <Link color="inherit" to='/'>
       Water My Plants
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "green"
    // theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function LogIn(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loggedIn, isLoggingIn } = useSelector(state => state.userReducer);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  console.log("Logged: ", loggedIn);
  const onChangeNameHandler = event => {
    event.preventDefault();
    return setUserName(event.target.value);
  };
  const onChangePasswordHandler = event => {
    event.preventDefault();
    return setPassword(event.target.value);
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    dispatch(login({ username: userName, password }));
    // redux logic for form submission goes here!
  };

  if (loggedIn) return <Redirect to="/dashboard" />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="User Name"
            value={userName}
            onChange={onChangeNameHandler}
            // autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={onChangePasswordHandler}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmitHandler}
            disabled={isLoggingIn}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
