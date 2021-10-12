import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";


function DispAnswer({ question }) {

  function renderAns() {
    console.log("heloooo",question)
    if (question.count_answers === 0 || question===false){
      return
    }
    else{
      return question.answers.map((answer, j) => {
        return (
          <>
            <li key={j}> {answer.body}  ,answered by ={answer.author} </li>
          </>
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