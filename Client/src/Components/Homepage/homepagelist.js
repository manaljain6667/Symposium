
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
    console.log("succes:", questions)
    setQues(questions.data);
  }

  useEffect(() => {
    getQues();
  }, []);

  return (
    <div class="container-fluid s">
        <div class="row row-body">
        <div className="col-8 col-sm disp">
          <Homepage ques={ques} />
        </div>
        <div className="col-4">
           
        </div>
      </div>
    </div>
  );
}

export default Ques;