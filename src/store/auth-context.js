import React,{useState} from 'react';

const authContext=React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{},
});


const calculateRemainingTimer=(expirationTimer)=>{
    const currentTime=new Date().getTime();
    const adjExpirationTime=new Date(expirationTimer).getTime();

    const remainninDuration=adjExpirationTime-currentTime;
    console.log(remainninDuration);
    return remainninDuration;

};


export const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem('token');
    const [token,setToken]=useState(initialToken);

    console.log(token);
    const userIsLoggedIn=!!token; // cool mehtod for get boolean value

    
    const logoutHandler=()=>{
        setToken(null);
        localStorage.removeItem('token');
    }

    const loginHandler=(tokenq,expirationTimer)=>{
        setToken(tokenq);
        localStorage.setItem('token',tokenq);
        
        // TIMER 
        const raminigTime=calculateRemainingTimer(expirationTimer);

        setTimeout(logoutHandler,raminigTime);
    };

    const contextValue={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logOut:logoutHandler,
    };

    return (
        <authContext.Provider value={contextValue}>
            {props.children}
        </authContext.Provider>
    );
};


export default authContext;
