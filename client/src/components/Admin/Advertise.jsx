import * as React from "react";
import PropTypes from "prop-types";
import { Box, Toolbar } from "@mui/material";

import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import Layout from "./Layout";
import api from "../../utils/api_call";

function Advertise(props) {
  

  const [Photo, setPhoto] = React.useState(null);
  const [Ad, setAd] = React.useState({
    company: "",
    service: "",
    location: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", Photo);
    formData.append("company", Ad.company);
    formData.append("service", Ad.service);
    formData.append("location", Ad.location);

    api.post("/post/ad", formData).then(({ data }) => {
      if (data.success) {
        alert("Successfully added");
        setAd({
          company: "",
          service: "",
          location: "",
        });
        var output = document.getElementById("photo");
        output.src = "";
      }
    });
  }
  function handleInput(e) {
    const newC = { ...Ad };
    newC[e.target.name] = e.target.value;

    setAd(newC);
  }

  function handlePhoto(e) {
    setPhoto(e.target.files[0]);

    var output = document.getElementById("photo");
    output.src = URL.createObjectURL(e.target.files[0]);
  }
  return (
    <>
      <Layout />
      <main className="mt-4 mx-lg-5">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-lg-10">
              <div className="card">
                <div className="card-body">
                  <h2 className="my-3">Add Advertisement</h2>
                  <div className="row">
                    <div className="col-lg-6">
                      <img
                        id="photo"
                        style={{
                          maxWidth: "100%",
                          margin: "auto",
                          display: "block",
                          border: "3px dotted",
                          minHeight: "12rem",
                        }}
                        src=""
                        onClick={() =>
                          document.getElementById("upload-photo").click()
                        }
                      />

                      <input
                        onChange={handlePhoto}
                        style={{ display: "none" }}
                        type="file"
                        name="profileImg"
                        id="upload-photo"
                      />
                    </div>
                    <div className="col-lg-6">
                      <form className=" justify-content-center">
                        <div className="form-control">
                          <div className="label d-block mb-2">Company</div>
                          <input
                            name="company"
                            value={Ad.company}
                            onChange={handleInput}
                            type="text"
                            className="form-control mb-2"
                          />
                          <div className="label d-block mb-2">Service</div>
                          <textarea
                            name="service"
                            value={Ad.service}
                            onChange={handleInput}
                            type="text"
                            className="form-control mb-2"
                            rows={5}
                          />
                          <div className="label d-block mb-2">Location</div>
                          <input
                            name="location"
                            value={Ad.location}
                            onChange={handleInput}
                            type="text"
                            className="form-control mb-2"
                          />
                          <button
                            onClick={handleSubmit}
                            className="btn btn-primary  my-0"
                            type="submit"
                          >
                            Add
                          </button>
                        </div>
                      </form>
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

Advertise.propTypes = {
  window: PropTypes.func,
};

export default Advertise;
