import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ErrorMessage from "../ErrorMessage/errormess" 
axios.defaults.withCredentials = true;
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage,setErrorMessage]=useState("")

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };
    console.log("hello")

      await axios.post("http://localhost:9000/auth/login", loginData);

      await getLoggedIn();
      history.push("/home");
    } catch (err) {if (err.response) {
      if (err.response.data.errorMessage) {
        setErrorMessage(err.response.data.errorMessage);
      }
    }
    }
  }

  return (
    <div>
      <h1>Log in to your account</h1>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form onSubmit={login}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;