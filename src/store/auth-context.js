import React,{useState} from 'react';

const authContext=React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{},
});

export const AuthContextProvider=(props)=>{
    const [token,setToken]=useState(null);

    console.log(token);
    const userIsLoggedIn=!!token; // cool mehtod for get boolean value

    const loginHandler=(tokenq)=>{
        setToken(tokenq);
        // console.log(token);
        
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
