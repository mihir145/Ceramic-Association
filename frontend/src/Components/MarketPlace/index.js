import React from "react";
import Header from "../Header";
import "./styles.css";

const MarketPlace = () => {
  const MiddleSection = () => {
    return (
      <div className="main-container">
        <h3>Companies</h3>
        <div></div>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <MiddleSection />
    </div>
  );
};

export default MarketPlace;
