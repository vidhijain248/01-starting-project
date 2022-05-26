import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
const emailReducer = (state,action)=>{
  if (action.type === 'User_input'){
    return {value:action.val,isValid : action.val .includes('@')};
  }
  if(action.type === 'Input_blur'){
    return {value : state.value,isValid : state.value.includes('@')};
  }
  return {value: '',isValid:false};
}
const passReducer = (state,action) =>{
  if(action.type === 'Pass_input'){
    return {value: action.val, isValid : action.val.trim().length > 6};
  }
  if(action.type === 'Pass_blur'){
    return {value:state.value, isValid:state.value.trim().length>6};
  }
  return {value:'',isValid:false}
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer,{
    value : '',
    isValid:null,
  });
  const [passState, dispatchPass] =useReducer(passReducer,{
    value:'',
    isValid:null
  });

  useEffect(() => {
    console.log('Effect Running');
    return () => {
      console.log("Effect Cleanup")
    }
  },[]);

  const {isValid:emailIsValid}=emailState;
  const {isValid:passwordIsValid}=passState;

  useEffect(() => {
   const identifier = setTimeout(()=>{
      console.log("Checking Form validity!")
      setFormIsValid(
        emailIsValid && passwordIsValid
      )
    },500)
    return () =>{
      console.log("cleanup");
      clearTimeout(identifier);
    }
  }, [emailIsValid,passwordIsValid]);
  
  const emailChangeHandler = (event) => {
   dispatchEmail({type:'User_input',val : event.target.value});

    // setFormIsValid(
    //   emailState.isValid && passState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({type:'Pass_input', val:event.target.value});

    // setFormIsValid(
    //  passState.isValid && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'Input_blur'})
  };

  const validatePasswordHandler = () => {
    dispatchPass({type:'Pass_blur'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
           passState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
