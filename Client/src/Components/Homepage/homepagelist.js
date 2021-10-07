
import axios from "axios";
import React, { useEffect, useState } from "react";
import Homepage from "./homepage"
// import CustomerList from "./CustomerList";

function Ques() {
    console.log("running")
  const [ques, setQues] = useState([]);

  async function getQues() {
      console.log("running")
     const questions = await axios.get("http://localhost:9000/ques");
     console.log("succes:",questions)
    setQues(questions.data);
  }

  useEffect(() => {
    getQues();
  }, []);

  return (
    <div>
      <Homepage ques={ques} />
    </div>
  );
}

export default Ques;