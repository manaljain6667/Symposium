import axios from "axios";
import React, {  useParams,useEffect, useState  } from "react";
// import ErrorMessage from "../ErrorMessage/errormess"
//import { useHistory } from "react-router-dom";
//import AuthContext from "../../context/AuthContext";


function QuestionPage(props) {
    const { id } = props.match.params
    // console.log(id)
  const [question, setQuestion] = useState(false);
 const[ like, Setlike]=useState(0)
    function fetchQuestion() {
        
        axios
          .get("http://localhost:9000/ques/" + id)
          .then((response) => {
            setQuestion(response.data);
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
  return(
  <div>
      <p>{question.body}</p>
      asked by {question.author}
      <p><h1>views : {question.viewsCount}</h1>
      
     <button onClick={OnLike}>Like</button>
     likes={question.upVoteCount}</p>
      </div>
  )

}
export default QuestionPage;
