import React from "react";
import { Link } from 'react-router-dom';
import './homepage.css'
function HomePage({ ques }) {

  function rendertags(tags) {
    return (
      <>
        {tags.map(function (tag, i) {
          return (<span key={i} className="text-color tags">{tag}</span>)
        })}
      </>
    )
  }

  function renderQues() {
    return ques.map((qp, i) => {
      return (
        <div className="row questions question-row">
          <div className="col-8">
            <div className="row row-color">
              <p key={i} ><Link to={"/ques/" + qp._id} className="link"> {qp.body}</Link></p>
            </div>
            <div className="row">
              <div className="col-6 author">
                <p className="text-color"> <span></span> <span>{qp.author}</span></p>
              </div>
              <div className="col-6">
                {rendertags(qp.tags)}
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col-3 mt-3 mr-1 questions box s">
                <span className="text-color">{qp.viewsCount}</span><br />
                <span className="text-color">Views</span>
              </div>
              <div className="col-3 mt-3 mr-1 questions box s">
                <span className="text-color">{qp.count_answers}</span><br />
                <p className="text-color">answers</p>
              </div>
              <div className="col-3 mt-3  questions box s">
                <span className="text-color">{qp.upVoteCount}</span><br />
                <span className="text-color">votes</span>
              </div>
            </div>
          </div>
        </div>
      );
    });
    // console.log(ques)
  }
  return (
    <div>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by Tags" aria-label="Recipient's username" aria-describedby="basic-addon2" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"><span>
            <i class="fas fa-search"></i>
          </span></button>
        </div>
      </div>
      {renderQues()}
    </div>
  );
}

export default HomePage;