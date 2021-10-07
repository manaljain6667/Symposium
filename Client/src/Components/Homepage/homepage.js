import React from "react";

function HomePage({ ques }) {
  function renderQues() {
    return ques.map((qp, i) => {
      return <li key={i}>{qp.body}  ,asked by ={qp.author}</li>;
    });
    // console.log(ques)
  }

  return (
    <div>
      <ul>{renderQues()}</ul>
      
    </div>
  );
}

export default HomePage;