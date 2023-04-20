import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/images/notfound.svg";
import Wrapper from "../assets/wrappers/Error";

const ErrorPage = () => {
  return (
    <Wrapper>
      <div className="container">
        <img src={img} alt="Not Found" width="500px;" height="500px;" />
        <h3>Wygląda na to, że zabłądziłeś...</h3>
        <center>
          <p>Podany link nie istnieje</p>
        </center>
        <center>
          <Link to="/">Powrót do strony głównej</Link>
        </center>
      </div>
    </Wrapper>
  );
};

export default ErrorPage;
