import { FourGPlusMobiledata } from "@mui/icons-material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api_call";
import auth from "../../utils/auth";
import Layout from "./Layout";
import "./style.css";

function AdminHome() {
  const navigate = useNavigate();
  //React.useEffect(() => {
  //  if (!auth.checkAdmin()) {
  //    navigate("/");
  //  }
  //}, []);
  const [Counts, setCounts] = useState({});
  useEffect(() => {
    fetchCounts();
  }, []);

  function fetchCounts() {
    api.get("/user/counts").then(({ data }) => {
      setCounts(data);
    });
  }

  return (
    <>
      <Layout />
      <main className="mt-4 mx-lg-5 dashboard">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-xxl-4 col-md-3">
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">Users </h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i
                        style={{
                          fontSize: "3rem",
                          position: "absolute",
                          right: "2rem",
                          top: "2rem",
                          color: "#2b9bf4",
                        }}
                        className="fas fa-user"
                      ></i>
                    </div>
                    <div className="ps-3">
                      <h1>{Counts.users}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xxl-4 col-md-3">
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">Matches </h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i
                        style={{
                          fontSize: "3rem",
                          position: "absolute",
                          right: "2rem",
                          top: "2rem",
                          color: "#2b9bf4",
                        }}
                        className="fas fa-user-check"
                      ></i>
                    </div>
                    <div className="ps-3">
                      <h1>{Counts.matchs}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xxl-4 col-md-3">
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">Relationships </h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i
                        style={{
                          fontSize: "3rem",
                          position: "absolute",
                          right: "2rem",
                          top: "2.3rem",
                          color: "#2b9bf4",
                        }}
                        className="fas fa-heartbeat"
                      ></i>
                    </div>
                    <div className="ps-3">
                      <h1>{Counts.relashionships}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xxl-4 col-md-3">
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">Users </h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i
                        style={{
                          fontSize: "3rem",
                          position: "absolute",
                          right: "2rem",
                          top: "2rem",
                          color: "#2b9bf4",
                        }}
                        className="fas fa-user"
                      ></i>
                    </div>
                    <div className="ps-3">
                      <h1>0</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminHome;
