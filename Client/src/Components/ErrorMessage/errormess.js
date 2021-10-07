import React from "react";
// import "./ErrorMessage.scss";

function ErrorMessage({ message, clear }) {
  return (
    <div>
      <p>{message}</p>
      <button onClick={clear}>Clear</button>
    </div>
  );
}

export default ErrorMessage;