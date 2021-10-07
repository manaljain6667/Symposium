import axios from "axios";
import React, { useContext, useState } from "react";
import ErrorMessage from "../ErrorMessage/errormess" 
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [errorMessage,setErrorMessage]=useState("")
  console.log("register")

const { getLoggedIn } = useContext(AuthContext);
 const history = useHistory();

  async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        email,
        password,
        name,
      };

await axios.post("http://localhost:9000/auth/", registerData);

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
      <h1>Register a new account</h1>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form onSubmit={register}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="name"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          placeholder="Verify your password"
          onChange={(e) => setPasswordVerify(e.target.value)}
          value={passwordVerify}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;