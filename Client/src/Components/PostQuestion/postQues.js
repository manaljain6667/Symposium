import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function PostQues() {
//   const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function postQues(e) {
   e.preventDefault();

    try {
      const quesBody = {
        body
      };
    console.log("hello")

    await axios.post("http://localhost:9000/ques/PostQues", quesBody);
    console.log("req accepted")
      await getLoggedIn();
      history.push("/home");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Post Your ques</h1>
      <form onSubmit={postQues}>
        <div><textarea
        name="message"
         rows="10" 
         cols="30"
         onChange={(e) => setBody(e.target.value)}
         value={body}>
            The cat was playing in the garden.
        </textarea>
        </div>
        
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default PostQues;