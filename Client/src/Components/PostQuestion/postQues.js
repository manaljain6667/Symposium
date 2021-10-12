import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import './tagsInput.css'
// import TagsInput from './Tagsinput';
function PostQues() {
  //   const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [input, setInput] = useState('');
  const [tags, setTags] = useState([]);
  const [err,seterr]=useState("");
  const [errs,seterrs]=useState("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if ((key === ',' || key === 'Enter')&& !tags.includes(trimmedInput) && trimmedInput.length ) {
      e.preventDefault();
      setTags(prevState => [...prevState, trimmedInput]);
      setInput('');
    }

    if (key === "Backspace"  && isKeyReleased && tags.length &&  !input.length) {
      e.preventDefault();
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      setTags(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  }
  const deleteTag = (index) => {
    setTags(prevState => prevState.filter((tag, i) => i !== index))
  }
  async function postQues(e) {
    e.preventDefault();
    // console.log(tags)
    let valid=true;
    if(body.length ==0){
      valid=false
      seterrs("question field should not be empty")
    }
    if(tags.length == 0){
      valid=false;
      seterr("enter atleast one tag and max 5 tags")
    }
    else if(tags.length > 5){
      valid=false;
      seterr("maximum 5 tags are allowed")
    }
    if(valid){
      try {
        const quesBody = {
          body,
          tags
        };
        console.log("hello")
        console.log(body)
        console.log("tags:"+tags)
        await axios.post("http://localhost:9000/ques/PostQues", quesBody);
        console.log("req accepted")
        await getLoggedIn();
        history.push("/home");
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div className="container-fluid s">
      <h1 className="text-color post">Post Your ques</h1>
      <form onSubmit={postQues}>
        <div className="form-group ">
          <textarea
          className="form-control textarea"
          name="message"
          rows="3"
          onChange={(e) => setBody(e.target.value)}
          value={body}>
          The cat was playing in the garden.
        </textarea>
        {errs.length > 0 && <span className="error">{errs}</span>}
        </div>
        {/* <TagsInput/> */}
        <div className="container-fluid p-0">
          <div className="tg">
          {tags.map((tag, index) => (
            <div className="tag">
              {tag}
              <button onClick={() => deleteTag(index)}>x</button>
            </div>
          ))}
          </div>
          <div className=" form-group input-tag">
          <input
            class="form-control input-tag"
            type="text"
            value={input}
            placeholder="Enter a tag and hit enter or press comma"
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onChange={onChange}
            data-role="tagsinput" 
          />
          </div>
          {err.length>0 && <span className="error">{err}</span>}
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default PostQues;