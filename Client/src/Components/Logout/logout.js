import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
axios.defaults.withCredentials = true;

function LogOutBtn() {
  const { getLoggedIn } = useContext(AuthContext);
  console.log(getLoggedIn)

  const history = useHistory();

  async function logOut() {
     await axios.get("http://localhost:9000/auth/logout");
    // await axios.get(
    //   "https://mern-auth-template-tutorial.herokuapp.com/auth/logout"
    // );
    await getLoggedIn();
    history.push("/home");
  }

  return <button onClick={logOut}>Log out</button>;
}

export default LogOutBtn;