import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import DispAnswer from './dispanswer';
import Homepagelist from '../Homepage/homepagelist'
import "../PostQuestion/tagsInput.css"
//import slash from '../Homepage/slash'




function Answer({ question }) {
  console.log("ans_ques", question)
  const [body, setBody] = useState("");
  // const [Quesid, setQuesid] = useState(question._id);
  // const [author, setauthor] = useState(question.author);
  // const [email, setemail] = useState("");
  // const [answer, setanswer] = useState({});

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  // useEffect(() => {    
  //   <DispAnswer qp={qp} ></DispAnswer>
  //  });


  function RenderQues() {

    async function postAns(e) {

      e.preventDefault();
      try {
        const ansBody = {
          body,
          Quesid: question._id,
          author: question.author,
          email: question.email,
        };
        console.log("ansbody", ansBody)

        await axios.post("http://localhost:9000/ques/postAns", ansBody);

        //e.returnValue = true;
        console.log("req accepted")
        //setanswer(ansBody)
        await getLoggedIn();
        window.location.reload();
        history.push("/ques/" + question._id);
      } catch (err) {
        console.error(err);
      }
    }


    return (
      <div>
        <div>
          <h3><span className="text-color">Post Your Answer</span></h3>
          <form onSubmit={postAns}>
            <div className="form-group ">

              <textarea
                className="form-control textarea"
                name="message"
                rows="5"
                cols="20"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </div>

            <button type="submit" >Post</button>

            );
          </form>

        </div>

      </div>
    );

  }
  return (
    <>
      {RenderQues()}
    </>
  );

}

export default Answer;