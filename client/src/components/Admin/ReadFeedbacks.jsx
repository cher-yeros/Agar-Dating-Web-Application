import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api_call";
import Auth from "../../utils/auth";
import Layout from "./Layout";

function ReadFeedbacks(props) {
  //const navigate = useNavigate();
  //useEffect(() => {
  //  if (!Auth.checkAdmin()) {
  //    navigate("/");
  //  }
  //}, []);

  const [Feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    getFeedbacks();
  }, []);

  function getFeedbacks() {
    api.get("/post/get-feedback").then(({ data }) => {
      setFeedbacks(data);
    });
  }
  return (
    <>
      <Layout />
      <main class="mt-4 mx-lg-5">
        <div class="container-fluid ">
          <div className="row">
            <div className="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <table class="table table-hover">
                    <thead class="blue-grey lighten-4">
                      <tr>
                        <th>#</th>
                        <th>FullName</th>
                        <th>Title</th>
                        <th>Body</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Feedbacks.map((fb, i) => (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{`${fb.User.firstname} ${fb.User.lastname}`}</td>
                          <td>{fb.title}</td>
                          <td>{fb.body}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ReadFeedbacks;
