import {useHistory} from 'react-router-dom';
import {useRef,useContext} from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {

  const authCTX=useContext(AuthContext);

  const passwordRef=useRef();

  const history=useHistory();

  const handleClick=(event)=>{
    event.preventDefault();
    const newPassword=passwordRef.current.value;

    console.log(newPassword);
    console.log(authCTX);

    // POST  request
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAh9kpxYhqnZnrwae65wJ5SnuAvaLCrHcI',{
    method:'POST',
    body:JSON.stringify({
      idToken:authCTX.token,
      password:newPassword,
      returnSecureToken:true,
    }),
    headers:{
      'Content-Type':'application/json'  
    }  
    }).then(res=>{
      console.log(res);
      // redirect
      history.replace('/');
    })
  }

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button onClick={handleClick}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
