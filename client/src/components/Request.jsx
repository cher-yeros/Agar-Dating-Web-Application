import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Navbar } from "react-bootstrap";
import LeftSide from "./Leftside";
import HomeAppBar from "./HomeAppBar";
import "../style/Dashboard.css";
import "../style/list-card.css";
import { Scrollbars } from "react-custom-scrollbars";
import profile from "../images/pp.jpg";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import api from "../utils/api_call";
import userLocation from "../utils/location";
import RequestList from "./Lists/RequestList";

const Request = (props) => {
  const navigate = useNavigate();

  //useEffect(() => {
  //  if (!Auth.checkAuth()) {
  //    navigate("/");
  //  }
  //}, []);

  const [users, setUsers] = useState([]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col
            style={{ padding: "0" }}
            className="left-side"
            xs={12}
            md={6}
            lg={3}
          >
            <LeftSide />
          </Col>

          <Col style={{ padding: "0" }} xs={12} md={6} lg={9}>
            <HomeAppBar title="Your Request" />
            <Row className="mx-1">
              <Col xs={12} md={6} lg={4}>
                <RequestList />
              </Col>
              <Col xs={12} md={6} lg={8}>
                {/*<ChatComponent></ChatComponent>*/}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Request;
