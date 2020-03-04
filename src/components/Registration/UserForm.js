import React, { useState, useEffect } from "react";
import FormUserDetails from "./FormUserDetails";
import Confirm from "./Confirm";
import { Redirect } from "react-router-dom";
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../store/actions/userActions";

const UserForm = props => {
  const loggedIn = useSelector(state => state.userReducer.loggedIn);
  const dispatch = useDispatch();
  const [users, setUsers] = useState({
    step: 1,
    userName: "",
    userNameError: "",
    password: "",            
    checkedA: false
  });

  useEffect(() => {
      axios
      .get("https://water-my-plants-bw-3.herokuapp.com/register")
      .then(res => {
          console.log(res.data)
          setUsers(res.data)
      })
  })


  if (loggedIn) return <Redirect to="/dashboard" />;

  const nextStep = () => {
    const { step } = users;
    setUsers({ ...users, step: step + 1 });
  };

  const prevStep = () => {
    const { step } = users;
    setUsers({ ...users, step: step - 1 });
  };

  const validate = () => {
    let isError = false;
    const errors = {
      userNameError: ""
    };

    if (users.userName.length < 5) {
      isError = true;
      errors.userNameError = "Username need to be at least 5 characters long";
    }

    if (isError) {
      setUsers({
        ...users,
        ...errors
      });
    }

    return isError;
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log("register form data:", users);
    const credentials = {
      username: users.userName,
      password: users.password,
      isServiceWorker: users.checkedA
    };

    const err = validate();

    if (!err) {
      dispatch(register(credentials));

      setUsers({
        userName: "",
        userNameError: "",
        password: "",
        checkedA: false
      });
      handleChange({
        userName: "",
        password: "",
        checkedA: false
      });
    } 
  };

  const handleChange = input => e => {
    setUsers({ ...users, [input]: e.target.value });
  };

  const handleChecked = e => {
    setUsers({ ...users, checkedA: e.target.checked });
  };

  const { step } = users;
  switch (step) {
    case 1:
      return (
        <FormUserDetails
          nextStep={nextStep}
          handleChange={handleChange}
          handleChecked={handleChecked}
          onSubmit={onSubmit}
          values={users}
        />
      );
    case 2:
        
      return (
        <Confirm
          nextStep={nextStep}
          prevStep={prevStep}
          values={users}
        />   
      );
    case 3:
      return <Redirect to="/dashboard" />;
  }
  return <div></div>;
};

export default UserForm;
