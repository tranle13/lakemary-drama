import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Home = () => {
  return (
    <div className="parent-div">
      <div className="top-div">
        <p style={{ fontFamily: "Gloria Hallelujah" }}>Korgi</p>
        <p style={{ fontFamily: "Reenie Beanie", fontSize: "30px" }}>
          Though she be but little, she is fearless
        </p>
      </div>

      <div
        className="bottom-div"
        style={{ margin: "0 150px", lineHeight: "45px" }}
      >
        <h2
          style={{
            fontFamily: "Gloria Hallelujah",
            marginBottom: "5%",
            marginTop: "5%"
          }}
        >
          Welcome!
        </h2>
      </div>
    </div>
  );
};

export default Home;
