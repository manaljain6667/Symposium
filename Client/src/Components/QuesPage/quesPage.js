import axios from "axios";
import React, { useParams, useEffect, useState } from "react";
import "../Homepage/homepage.css"
// import ErrorMessage from "../ErrorMessage/errormess"
//import { useHistory } from "react-router-dom";
//import AuthContext from "../../context/AuthContext";


function QuestionPage(props) {
  const { id } = props.match.params
  // console.log(id)
const [question, setQuestion] = useState(false);
const[ like, Setlike]=useState(0)
  async function fetchQuestion() {
      axios
        .get("http://localhost:9000/ques/" + id)
        .then((response) => {
          
           setQuestion(response.data);
          console.log(question.tags)
          //setAns(response.data.answer)
          // setTagArray(response.data.tagArray);
        });
     }
  function OnLike(){console.log("http://localhost:9000/ques/upVote/" + id)
      axios.get("http://localhost:9000/ques/upVote/" + id ).then((response)=>{
        console.log(response.data.upVoteCount)
        Setlike(response.data.upVoteCount)
      }).catch((err)=>{console.log(err)})
    }
useEffect(() => fetchQuestion(),[like]);
  return (
    <div className="quest">
      <p className="text-color title">{question.body}</p>
      <div className="row">
        <div className="col-2">
          <span className="text-color postby">asked by {question.author}</span>
          {/* Manal add css to tags */}
        </div>
        <div className="col-2">
          <span className="text-color view">views : {question.viewsCount}</span>
        
        {/* Manal !! needs to build UI for Vote */}
          <button onClick={OnLike}>Upvote</button>
          <span className="text-color view">Votes : {question.upVoteCount}</span>
        </div>
      </div>
    </div>
  )

}
export default QuestionPage;
