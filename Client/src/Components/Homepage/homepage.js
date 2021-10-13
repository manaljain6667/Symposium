import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import './homepage.css'
import AuthContext from "../../context/AuthContext";
function HomePage({ ques }) {

  const data = useContext(AuthContext);

  console.log(data)

  // console.log("actve_client: ", loggedIn)

  const loggedIn = data.loggedIn

  function rendertags(tags) {
    return (
      <>
        {tags.map(function (tag, i) {
          return (<span key={i} className="text-color tags tag-box">{tag}</span>)
        })}
      </>
    )
  }


  function renderQues() {

    return ques.map((qp, i) => {
      return (
        <div className="row questions question-row">
          <div className="col-8">
            <div className="row row-color ml-1">
              {/* <p key={i} ><Link to={"/ques/" + qp._id} className="link"> {qp.body}</Link></p> */}
              {loggedIn === true && (
                <>
                  <p key={i} className="title"><Link to={"/ques/" + qp._id} className="link"> {qp.body}</Link></p>
                </>)
              }
              {loggedIn === undefined && (
                <>
                  <p key={i} ><Link to={"/login"} className="link"> {qp.body}</Link></p>
                </>)
              }
            </div>
            <div className="row">
              <div className="col-5 author">
                <p className="postby">  <span>{qp.author}</span></p>
              </div>
              <div className="col-7">
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
      <div class="row input-group mb-3">
        <div class="input-group-append mb-3">
          <input type="text" class="form-control" placeholder="Search by Tags" aria-label="Recipient's username" aria-describedby="basic-addon2" />
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