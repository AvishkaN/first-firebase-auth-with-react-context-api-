import React,{useState} from 'react';

const authContext=React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{},
});

export const AuthContextProvider=(props)=>{
    const [token,setToken]=useState(null);

    // console.log(token);
    const userIsLoggedIn=!!token;

    const loginHandler=(tokenq)=>{
        setToken(tokenq);
        
    };

    const logoutHandler=()=>{
        setToken(null);
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
