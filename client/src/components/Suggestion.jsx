import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../style/Dashboard.css";
import "../style/list-card.css";
import api from "../utils/api_call";
import HomeAppBar from "./HomeAppBar";
import LeftSide from "./Leftside";
import SuggestionList from "./Lists/SuggestionList";
import Post from "./Post";

const Suggestion = (props) => {
  //const navigate = useNavigate();
  //useEffect(() => {
  //  if (!Auth.checkAuth()) {
  //    navigate("/");
  //  }
  //}, []);
  const currentUser = useSelector((state) => state.auth.loggedUser);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchSuggestion();
  }, []);

  function fetchSuggestion() {
    api
      .post("/match/get-suggestion", {
        id: currentUser?.id,
      })
      .then(({ data }) => {
        console.log(data);
        if (!data?.success) {
          console.log(data);
        }
        setUsers(data);
      });
  }

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
            <HomeAppBar title="Your Suggestion" />
            <Row className="mx-1">
              <Col xs={12} md={6} lg={4}>
                <SuggestionList />
              </Col>
              <Col xs={12} md={6} lg={2}></Col>
              <Col xs={12} md={6} lg={5}>
                <Post />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Suggestion;
