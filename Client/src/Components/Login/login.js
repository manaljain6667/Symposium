import axios from "axios";
import './styles.css';
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ErrorMessage from "../ErrorMessage/errormess"
import { Link } from 'react-router-dom';

axios.defaults.withCredentials = true;
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [err,seterr]=useState({})

  const data = useContext(AuthContext);
  const getLoggedIn=data.getLoggedIn
  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    var isValidated=true
    let error={};
    // if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
    //   isValidated=false;
    //   error["email"]="Email is invalid";
    // }
    // if(password.length <6){
    //   isValidated=false;
    //   error["password"]="Password length is too short";
    // }
    if(isValidated){
    try {
      const loginData = {
        email,
        password,
      };
      console.log("hello")

      await axios.post("http://localhost:9000/auth/login", loginData);
      

      await getLoggedIn();
      console.log("login:",data.loggedIn)
     history.push("/home");
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          // setErrorMessage(err.response.data.errorMessage);
          setErrorMessage(err.response.data.errorMessage)
        }
      }
    }
  }
  
  else{
    seterr(error)
  }
  }

  return (
    <div>
      {/* <h1>Log in to your account</h1> */}
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}

      <div className="container">
        <div className="row row-container">
          <div className="col-3"></div>
          <div className="col-5 section">
            <form className="demoForm" onSubmit={login}>
              <h2>Log In</h2>
              
              <div >
                <label htmlFor="email">Email address</label>
                <input type="email" required className="form-control" name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
                  <p className="errors">{err["email"]}</p>
              </div>
              <div className="form-group" >
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} />
                  <p className="errors">{err["password"]}</p>
              </div>
              <button type="submit" className="btn btn-dark btn-lg btn-block" >Log In</button>
              
              <p className="lr text-right">
                <Link className="link" to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;