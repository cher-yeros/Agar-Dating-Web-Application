import { Card, CardContent, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../utils/api_call";
import { Carousel } from "react-bootstrap";

function ShowAds() {
  useEffect(() => {
    fetchAds();
  }, []);

  const [Ads, setAds] = useState([]);

  function fetchAds() {
    api.get("/post/ads").then(({ data }) => {
      setAds(data);
      console.log(data);
    });
  }

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Card style={{ height: "86vh", marginTop: "0.5rem" }}>
      <CardHeader>Advertisement</CardHeader>
      <CardContent style={{ height: "100%" }}>
        <Carousel
          style={{ height: "100%" }}
          activeIndex={index}
          onSelect={handleSelect}
        >
          {Ads.map((ad) => (
            <Carousel.Item key={ad.id} style={{ height: "80vh" }}>
              <img
                className="d-block w-100"
                src={`http://localhost:5000/${ad.photo}`}
                alt={ad.company}
                style={{
                  //  height: "100%",
                  height: "18rem",
                }}
              />
              <Carousel.Caption
                style={{
                  background: "#00000045",
                  //  borderRadius: "1rem",
                  width: "100%",
                  margin: "0",
                  padding: "5px",
                  position: "relative",
                  left: "0",
                  height: "15rem",
                  //  bottom: "-1rem",
                }}
              >
                <h3>{ad.company}</h3>
                <p>{ad.location}</p>
                <p>{ad.service}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </CardContent>
    </Card>
  );
}

export default ShowAds;
