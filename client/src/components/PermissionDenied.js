import React from "react";
import Wrapper from "../assets/wrappers/PermissionDenied";
import { Link } from "react-router-dom";
import img from "../assets/images/protected.svg";

const PermissionDenied = () => {
  return (
    <Wrapper>
      <div className="main">
        <h2>Nie posiadasz odpowiednich uprawnień, aby móc tutaj wejść!</h2>
        <center>
          <img
            className="image"
            src={img}
            alt="No permissions"
            width="200px;"
            height="200px;"
          />
        </center>
        <Link to="/home">Powrót do strony głównej</Link>
      </div>
    </Wrapper>
  );
};

export default PermissionDenied;
