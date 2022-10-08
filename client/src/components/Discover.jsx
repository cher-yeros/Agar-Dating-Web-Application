import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeftSide from "./Leftside";
import HomeAppBar from "./HomeAppBar";
import UserList from "./UserList";
import ChatComponent from "./Chat/Chat1/Chat1";
import "../style/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

const Discover = (props) => {
  //const navigate = useNavigate();
  //React.useEffect(() => {
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

          <Col xs={12} md={6} lg={9}>
            <Container fluid style={{ padding: "0" }}>
              <HomeAppBar title="Discover" />
              <Row>
                <Col xs={12} md={6} lg={4}>
                  <UserList />
                </Col>
                <Col xs={12} md={6} lg={8}>
                  {/*<ChatComponent></ChatComponent>*/}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};
//  const Dashboard = withRouter(Dash);
export default Discover;
