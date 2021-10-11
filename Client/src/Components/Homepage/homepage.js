import React from "react";
import { Link } from 'react-router-dom';

function HomePage({ ques }) {
  function renderQues() {
    return ques.map((qp, i) => {
      // console.log("/ques/",qp._id )
      return (
      <li key={i}> <Link to={"/ques/"+qp._id }> {qp.body}  ,asked by ={qp.author} , views= {qp.viewsCount} likes={qp.upVoteCount}</Link></li>)
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