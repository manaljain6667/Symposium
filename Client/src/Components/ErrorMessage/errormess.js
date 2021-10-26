import React from "react";
import "../Homepage/homepage.css"
// import "./ErrorMessage.scss";

function ErrorMessage({ message, clear }) {
  return (
    <div>
      <p className="error">{message}</p>
      <button onClick={clear}>Clear</button>
    </div>
  );
}

export default ErrorMessage;