import { useState, useRef, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {obtenerTOKEN} from '../../Redux/Actions.js'
import classes from './AuthForm.module.css';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
const AuthForm = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const token = useSelector(state => state.token);
  const dispatch = useDispatch();

  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  
  

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    

    if (isLogin) {
      fetch(
        'https://hsmxcontacts.herokuapp.com/api/user/auth/login',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
           
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then(res=> res.json())
       .then(json => {

          console.log(json);
          if(json.accessToken) dispatch(obtenerTOKEN(json.accessToken));
        });
    } else {
      fetch(
        'https://hsmxcontacts.herokuapp.com/api/user/auth/registro',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
           
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => {
        if (res.ok) {
          setIsLogin(!isLogin);
        } else {
          return res.json().then((data) => {
            // show an error modal
            console.log(data);
          });
        }
      });
    }
   
  };
  
  
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password'  ref={passwordInputRef} required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
            <button 
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button> 
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
