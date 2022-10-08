import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../utils/api_call";
import { Carousel } from "react-bootstrap";

function Post() {
  useEffect(() => {
    //fetchAds();
    fetchRPosts();
  }, []);

  const [Ads, setAds] = useState([]);
  const [RPosts, setRPosts] = useState([]);

  function fetchAds() {
    api.get("/post/ads").then(({ data }) => {
      setAds(data);
    });
  }

  function fetchRPosts() {
    api.get("/post/rposts").then(({ data }) => {
      setRPosts(data.posts);
    });
  }

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Card style={{ height: "86vh", marginTop: "0.5rem" }}>
      <CardHeader>Advertisement</CardHeader>
      <CardContent>
        {RPosts.map((r) => (
          <div className="col-LG-12">
            <div className="card info-card sales-card">
              <div className="card-body">
                <h5 className="card-title">
                  {r.user.firstname + " " + r.user.lastname}
                  <br /> and
                  <br />
                  {r.partner.firstname + " " + r.partner.lastname}
                  <br />
                </h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i
                      style={{
                        fontSize: "3rem",
                        position: "absolute",
                        right: "2rem",
                        top: "2.3rem",
                        color: "#f9403b",
                      }}
                      className="fas fa-heartbeat"
                    ></i>
                  </div>
                  <div className="ps-3">
                    <h4>Started relationships</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          //<Card
          //  style={{
          //    maxWidth: 345,
          //  }}
          //>
          //  <CardContent>
          //    <Typography variant="h6" component="div">
          //      {r.user.firstname + " " + r.user.lastname} and{" "}
          //      {r.partner.firstname + " " + r.partner.lastname} are in a
          //      relationship!
          //    </Typography>
          //  </CardContent>
          //  <CardMedia
          //    sx={{
          //      width: "50%",
          //      height: "auto",
          //      margin: "auto",
          //    }}
          //    component="img"
          //    height="140"
          //    id="profileImg"
          //  />
          //</Card>
        ))}
        {/*<Carousel activeIndex={index} onSelect={handleSelect}>
          {RPosts.map((rposts) => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=First slide&bg=373940"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>*/}
      </CardContent>
    </Card>
  );
}

export default Post;

function RCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=First slide&bg=373940"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
