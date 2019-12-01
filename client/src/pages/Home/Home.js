import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Home = () => {
  return (
    <div className="parent-div">
      <div className="top-div">
        <p style={{ fontFamily: "Gloria Hallelujah" }}>Korgi</p>
        <p style={{ fontFamily: "Reenie Beanie", fontSize: "30px"}}>Though she be but little, she is fearless</p>
      </div>
      
        <div className="bottom-div" style= {{ margin: "0 150px", lineHeight: "45px"}}>
          <h2 style={{ fontFamily: "Gloria Hallelujah", marginBottom: "5%", marginTop: "5%"}}>Welcome!</h2>
          <p style={{ fontFamily: "Gloria Hallelujah", fontSize: "20px"}}>
            <span style={{ fontWeight: 800, letterSpacing: "5px" }}>Kor·gi</span> - the word originates from Wales, 
            a mystical land of foggy rolling hills and castles.

            In their Welsh language, it means little dog. 
            A breed attributed for their warmth, cleverness, and curiosity. 

            Like the dog, this application is based on those same <Link to="discover" style={{ textDecoration: "blank", color: "black"}}>quirks</Link>. 
            We serve as a platform for little humans and the one inside all of us to express our own individuality
            without the need of words, but with objects. So bring your dog or borrow one and lets explore together. 
            Remember, it’s less of what we see but more of how we see things.
          </p>
        </div>
    </div>
  );
}

export default Home;
