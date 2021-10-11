import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [userId , setUserId]=useState("")

  async function getLoggedIn() {
   const loggedInRes = await axios.get("http://localhost:9000/auth/loggedIn");
    // const loggedInRes = await axios.get(
    //   "https://mern-auth-template-tutorial.herokuapp.com/auth/loggedIn"
    // );
    await setUserId(loggedInRes.data.id)
    await setLoggedIn(loggedInRes.data.loggedIn);
    // console.log("ID: ",loggedInRes.data.id)
    
    console.log("setid",userId)
    
  }

  useEffect(() => {
    getLoggedIn();
  }, [loggedIn]);

  return (
  
    <AuthContext.Provider value={{ userId, loggedIn,  getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext
export { AuthContextProvider };