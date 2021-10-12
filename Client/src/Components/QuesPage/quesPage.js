import axios from "axios";
import React, { useParams, useEffect, useState } from "react";
import Answer from './answer_individual';
import DispAnswer from './dispanswer';
import "../Homepage/homepage.css"
// import ErrorMessage from "../ErrorMessage/errormess"
//import { useHistory } from "react-router-dom";
//import AuthContext from "../../context/AuthContext";


function QuestionPage(props) {
  const { id } = props.match.params
  // console.log(id)
const [question, setQuestion] = useState(false);
const[ like, Setlike]=useState(0)
const[ Tags, SetTags]=useState(0)

  async function fetchQuestion() {
      axios
        .get("http://localhost:9000/ques/" + id)
        .then((response) => {
           setQuestion(response.data);
           SetTags(response.data.tags);
          //setAns(response.data.answer)
          // setTagArray(response.data.tagArray);
        });
     }
  function OnLike(){console.log("http://localhost:9000/ques/upVote/" + id)
      axios.get("http://localhost:9000/ques/upVote/" + id ).then((response)=>{
        console.log(response.data.upVoteCount)
        // console.log("tags",Tags)
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
          {/* <span>  { question.tags}    </span> */}
        </div>
        <div className="col-2">
          <span className="text-color view">views : {question.viewsCount}</span>
        
        {/* Manal !! needs to build UI for Vote */}
          <button onClick={OnLike}>Upvote</button>
          <span className="text-color view">Votes : {question.upVoteCount}</span>
        </div>
      </div>
      {<DispAnswer question={question}></DispAnswer>}
      {<Answer question={question}></Answer>}
    </div>
  )

}
export default QuestionPage;
