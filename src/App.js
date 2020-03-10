import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

import Data from "./components/DustinRender.js/DustinData";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NavBar from "./components/NavBar/NavBar";
import UserForm from "./components/Registration/UserForm";
import LogIn from "./components/Login/LogIn";
import Dashboard from "./components/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { updateApp, register, getUser } from "./store/actions/userActions";
import PlantView from "./components/PlantView/PlantView";
import PlantProfile from "./components/PlantProfile/PlantProfile";
import SettingsView from "./components/SettingsView/SettingsView";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  console.log("CURRENT REDUX USER: ", user);
  useEffect(() => {
    dispatch(updateApp());
    dispatch(
      register({ username: "new", password: "test", isPlantParent: 1 })
    );
  }, [dispatch]);

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        <Route exact path="/login" component={LogIn} />
        <Route exact path="/register" component={UserForm} />

        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <PlantProfile />
        </PrivateRoute>
        <PrivateRoute path="/plant/:id">
          <PlantView />
        </PrivateRoute>
        <PrivateRoute path="/settings">
          <SettingsView />
        </PrivateRoute>
      </Switch>
      <Data />
    </div>
  );
}

export default App;
