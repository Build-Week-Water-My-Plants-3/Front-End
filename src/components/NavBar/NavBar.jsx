import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/userActions";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  tabContainer: {
    height: "100%"
  },
  tabLink: {
    width: "20%",
    minWidth: "75px",
    fontSize: 12
  },
  tabIndicator: {
    backgroundColor: "#ffffffdd"
  },
  logoutButton: {
    color: "#fff"
  },
  avatarIcon: {
    marginRight: 10,
    marginLeft: 2
  }
}));

const findActiveTabIndex = (location, loggedIn) => {
  //Will give the default tab index depending on the route.
  //This fixes the refresh bug, whenever the user refreshes, the tabs will default back to 0 (which will always route the user to "/".)
  if (!loggedIn) {
    switch (location.pathname) {
      case "/register":
        return 0;
      case "/login":
        return 1;
      default:
        return 0;
    }
  } else {
    switch (location.pathname) {
      case "/dashboard":
        return 0;
      case "/settings":
        return 1;
      case "/profile":
        return 2;
      default:
        return 0;
    }
  }
};

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.userReducer.loggedIn);
  const defaultIndex = findActiveTabIndex(history.location, loggedIn); // Finds the default tab index by using url endpoint
  const [currentTab, setCurrentTab] = useState(defaultIndex);
  const classes = useStyles();

  useEffect(() => {
    //Sets current tab index depending on location.
    //Only runs when a user manually changes the url and presses enter (Will make a http request that refreshes the page)
    const activeTabIndex = findActiveTabIndex(history.location, loggedIn);
    setCurrentTab(activeTabIndex);
  }, [history.location, loggedIn]);

  const handleTabChange = (currentValue, newValue) => {
    if (!loggedIn) {
      switch (newValue) {
        case 0:
          history.push("/register");
          break;
        case 1:
          history.push("/login");
          break;
        default:
          history.push("/");
          break;
      }
    } else {
      switch (newValue) {
        case 0:
          history.push("/dashboard");
          break;
        case 1:
          history.push("/settings");
          break;
        case 2:
          history.push("/profile");
          break;
        default:
          history.push("/");
          break;
      }
    }
    setCurrentTab(newValue);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    dispatch(logout());
    history.push("/login");
  };

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        {/* <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h5" className={classes.title}>
          Water My Plants!
        </Typography>

        {/* If user is NOT logged in */}
        {loggedIn ? (
          <React.Fragment>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              aria-label="navigation tab links"
              className={classes.tabContainer}
              classes={{ indicator: classes.tabIndicator }}
            >
            
              <Tab label="Dashboard" className={classes.tabLink} />
              <Tab label="Plant Settings" className={classes.tabLink} />
              <Tab label="Plant Profile" className={classes.tabLink} />
            </Tabs>
            <AccountCircleIcon className={classes.avatarIcon} />
            <Button onClick={handleLogout} className={classes.logoutButton}>
              Logout
            </Button>
          </React.Fragment>
        ) : (
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="navigation tab links"
            className={classes.tabContainer}
            classes={{ indicator: classes.tabIndicator }}
          >
            <Tab label="Register" className={classes.tabLink} />
            <Tab label="Login" className={classes.tabLink} />
          </Tabs>
        )}

        {/* <Button color="inherit">Login</Button>
        <Button color="inherit">Settings</Button> */}
        {/* TODO: Logout Button if user is signed in, MAYBE CALENDAR TAB? */}
        
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
