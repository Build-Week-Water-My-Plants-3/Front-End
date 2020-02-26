import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
//Redux
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

//Reducers
import { userReducer } from "./store/reducers/userReducer";

//Theme color imports
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import green from "@material-ui/core/colors/green";

const rootReducer = combineReducers({ userReducer });

const store = createStore(rootReducer, applyMiddleware(thunk));

//Creating the Material Theme colors
//Making the blue a different shade (darker than default)
const primaryColor = green[700];

//Making the theme to implement into ThemeProvider
const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor
    },
    secondary: grey
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
