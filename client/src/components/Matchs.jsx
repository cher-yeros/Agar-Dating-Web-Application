import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Navbar } from "react-bootstrap";
import LeftSide from "./Leftside";
import HomeAppBar from "./HomeAppBar";
import MatchsList from "./Lists/MatchsList";
import "../style/Dashboard.css";
import "../style/list-card.css";
import { Scrollbars } from "react-custom-scrollbars";
import profile from "../images/pp.jpg";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import api from "../utils/api_call";
import userLocation from "../utils/location";
import Post from "./Post";
import ShowAds from "./ShowAd";

const Matchs = (props) => {
  //const navigate = useNavigate();
  //useEffect(() => {
  //  if (!Auth.checkAuth()) {
  //    navigate("/");
  //  }
  //}, []);

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
            <HomeAppBar title="Your Matchs" />
            <Row>
              <Col xs={12} md={6} lg={4}>
                <MatchsList />
              </Col>
              <Col xs={12} md={6} lg={3}></Col>
              <Col xs={12} md={6} lg={5}>
                <ShowAds />
              </Col>{" "}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Matchs;
