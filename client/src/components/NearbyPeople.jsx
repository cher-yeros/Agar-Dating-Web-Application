import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/locationSlice";
import "../style/Dashboard.css";
import "../style/list-card.css";
import api from "../utils/api_call";
import HomeAppBar from "./HomeAppBar";
import LeftSide from "./Leftside";

const NearbyPeople = (props) => {
  location();
  const user = useSelector((state) => state.auth.loggedUser);
  const ul = useSelector((state) => state.location);

  useEffect(() => {
    fetchNearby();
  }, []);

  const dispatch = useDispatch();
  function location() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function(result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition((pos) => {
              dispatch(
                update({
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                })
              );
            });
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                dispatch(
                  update({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                  })
                );
                //localStorage.setItem("location", JSON.stringify(loc));
              },
              (err) => {
                alert(`ERROR(${err.code}): ${err.message}`);
              },
              {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
              }
            );
          } else if (result.state === "denied") {
            alert("Location Access Denied!");
          }
          result.onchange = function() {
            console.log(result.state);
          };
        });
    } else {
      alert("Geo Location not available!");
    }
  }

  const [users, setUsers] = useState([]);

  function fetchNearby() {
    console.log("gender", user.gender);
    api
      .post("/user/nearby", { ...ul, gender: user.gender })
      .then(({ data }) => {
        let filtered = data.filter((item) => !(item.id == user?.id));
        setUsers(filtered);
      });
  }

  function calcDistance(d) {
    const rounded = Number(d?.toFixed(2));
    if (Number(d) == 0) {
      return "0 M away";
    } else if (rounded <= 0.999999999) {
      return Number((d * 1000)?.toFixed(2)) + " M away";
    } else {
      return rounded + " KM away";
    }
  }

  function sendRequest(u) {
    const sender_id = user?.id;
    const receiver_id = u.id;
    const type = "match";

    const req = { sender_id, receiver_id, type };

    api.post("/request/send-request", req).then(({ data }) => {
      fetchNearby();
      if (!data.success) {
        alert(data.message);
      } else {
        alert("Match Request Sent");
      }
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
            <HomeAppBar title="Nearby People" />
            <Container fluid>
              <Scrollbars
                style={{ width: "100%", height: "89vh", marginTop: "1.5rem" }}
              >
                <Row>
                  {users.map((user) => (
                    <Col
                      style={{ paddingBottom: "1rem" }}
                      key={user.id}
                      xs={6}
                      md={4}
                      lg={3}
                    >
                      <div id="album" className="album card-user">
                        <img
                          src={
                            user?.avatar
                              ? `http://localhost:5000/${user?.avatar}`
                              : "images/default-avatar.jpg"
                          }
                          alt="Album 1"
                        />

                        <div className="info-container pt-1">
                          <button
                            style={{
                              display: "block",
                              width: "5rem",
                              height: "1.8rem",
                              margin: "auto",
                              border: "none",
                              background: "#f9403b",
                              color: "white",
                            }}
                            onClick={() => sendRequest(user)}
                            className=" btn-sm"
                          >
                            Request
                          </button>
                          <h5 className="name">
                            {user.firstname + " " + user.lastname}
                          </h5>
                          <h5 className="distance">
                            {calcDistance(user.distance)}
                          </h5>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Scrollbars>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};
//  const Dashboard = withRouter(Dash);
export default NearbyPeople;
