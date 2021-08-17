import React,{useState} from 'react';

const authContext=React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{},
});

export const AuthContextProvider=(props)=>{
    const initialState=localStorage.getItem('token');
    const [token,setToken]=useState(initialState);

    console.log(token);
    const userIsLoggedIn=!!token; // cool mehtod for get boolean value

    const loginHandler=(tokenq)=>{
        setToken(tokenq);
        // console.log(token);
        localStorage.setItem('token',tokenq);
        
    };

    const logoutHandler=()=>{
        setToken(null);
        localStorage.removeItem('token');
    }

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
