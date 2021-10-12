import axios from "axios";
import React, { useContext, useState } from "react";
import ErrorMessage from "../ErrorMessage/errormess"
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import './styles.css';
import { Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const [err,seterr]=useState({})
  const [errorMessage, setErrorMessage] = useState("")
  console.log("register")

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  
  async function register(e) {
    e.preventDefault();

    var isValidated=true
    let error={};
    if(name.length <1){
      isValidated=false;
      error["name"]="Field user name cannot be empty";
    }
    if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
      isValidated=false;
      error["email"]="Email is invalid";
    }
    if(password.length <6){
      isValidated=false;
      error["password"]="Password length is too short";
    }
    
    if( password  !== passwordVerify){
      isValidated=false;
      error["passwordverify"]="Password and confirm password do not match";
    }
    if(isValidated){
      let error={}
      seterr(error)
      try {
        const registerData = {
          email,
          password,
          name,
        };
  
        await axios.post("http://localhost:9000/auth/", registerData);
  
        await getLoggedIn();
        history.push("/login");
      } catch (err) {
        if (err.response) {
          if (err.response.data.errorMessage) {
            setErrorMessage(err.response.data.errorMessage);
          }
        }
      }
    }
    else{
      seterr(error)
    }
  }

  return (
    
    <div className="container">
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
        <div className="row row-container">
          <div className="col-3"></div>
          <div className="col-5 section">
            <form className="demoForm" onSubmit={register}>
              <h2>Sign up</h2>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-control"
                  placeholder="Enter your user name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name} />
                   <p className="errors">{err["name"]}</p>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" required className="form-control" name="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email} />
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
              <div className="form-group" >
                <label htmlFor="repassword">Confirm Password</label>
                <input type="password" className="form-control" name="repassword"
                  placeholder="Confirm Password"
                  onChange={(e) => setPasswordVerify(e.target.value)}
                  value={passwordVerify} />
                   <p className="errors">{err["passwordverify"]}</p>
              </div>
              <button type="submit" className="btn btn-dark btn-lg btn-block">Sign up</button>
            </form>
            <p className="text-right">
              <Link className="link" to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
  );
}

export default Register;