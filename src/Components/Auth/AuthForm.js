import { useState,useRef,useContext } from 'react';
import authContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const InputEmailref=useRef();
  const passwordInputref=useRef();

  const authCTX=useContext(authContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(event)=>{
    event.preventDefault();
    console.log(`btn clicked`);
    
    setLoading(true);
      const EnteredEmail=InputEmailref.current.value;
      const EnteredPassword=passwordInputref.current.value;
      
      // OPTIONAL addd validation
      let url;
      if(isLogin){ //login
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAh9kpxYhqnZnrwae65wJ5SnuAvaLCrHcI';
      }else{ // signUp 
        url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAh9kpxYhqnZnrwae65wJ5SnuAvaLCrHcI';
      
      };
        fetch(url,
        {
          method:'POST',
          body:JSON.stringify({
            email:EnteredEmail,
            password:EnteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          setLoading(false);
          if (res.ok) { // ok 
            res.json().then(data=>{
              console.log(data)
              // WORKING WITH context
                authCTX.login(data.idToken);
                console.log(authCTX);

              //

              return data;
            });
          } else { //has error
            return res.json().then((data) => {
              
              let errMessage='authintication fail';
              (data.error.message) && (errMessage=data.error.message);

              alert(errMessage);
            });
          }
          });
 
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={InputEmailref} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordInputref} required />
        </div>
        <div className={classes.actions}>
         {
          !isLoading && <button onClick={submitHandler}>{isLogin ? 'Login' : 'Create Account'}</button>
         } 
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
