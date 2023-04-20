import React from "react";
import Wrapper from "../assets/wrappers/ClosedOffer";
import { Link } from "react-router-dom";
import img from "../assets/images/outofstock.svg";

const ClosedOffer = () => {
  return (
    <Wrapper>
      <div className="main">
        <h2>
          Oferta dla tego pojazdu jest tymczasowo niedostępna. Spróbuj później!
        </h2>
        <center>
          <img
            src={img}
            alt="This offer was closed"
            width="200px;"
            height="200px;"
          />
        </center>
        <Link to="/allcars">Powrót do wyszukiwarki samochodów</Link>
      </div>
    </Wrapper>
  );
};

export default ClosedOffer;
