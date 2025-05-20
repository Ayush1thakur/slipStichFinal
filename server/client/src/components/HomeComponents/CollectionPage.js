import React from "react";
import "./collectionPage.css";
import { Discover } from "../../content/homeContent";
import { IoIosArrowForward } from "react-icons/io";

const CollectionPage = () => {
  return (
    <div className="collection-page">
      <h1 className="collection-title">Discover Curated Collection</h1>

      <div className="card-container">
        {Discover.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt="" />
            <div className="text">
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
              <a href="/">{card.action}<IoIosArrowForward/></a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
