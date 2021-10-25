import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "../Homepage/homepage.css"

function DispAnswer({ question }) {

  function renderAns() {
    console.log("heloooo",question)
    if (question.count_answers === 0 || question===false){
      return
    }
    else{
      return question.answers.map((answer, j) => {
        return (
          <div className="container answer-box">
            <div className="row ml-5">
            <p key={j} className="text-color "> {answer.body}</p>
            </div>
            <div className="row ml-5">
            <p key={j+1} className="text-color">answered by ={answer.author} </p>
            </div>
          </div>
        )
      })
    }

  }

  return (
    <div>
      Answers:
      {renderAns()}
    </div>
  );

}




export default DispAnswer;