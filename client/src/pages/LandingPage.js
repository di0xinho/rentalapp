import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavIcon from "../assets/images/navicon.svg";
import MainImage from "../assets/images/landingpageimg.svg";
import Wrapper from "../assets/wrappers/LandingPage";

const LandingPage = () => {
  return (
    <Wrapper>
      <div>
        <nav>
          <img src={NavIcon} alt="Navigation image" className="img nav-img" />
          <h1>autowypozyczalnia.pl</h1>
          <img src={NavIcon} alt="Navigation image" className="img nav-img" />
        </nav>
        <div className="container page">
          <div className="info">
            <h1>
              Wypożyczalnia aut <span>online</span>
            </h1>
            <p>
              Dzięki naszej aplikacji do wypożyczania samochodów, możesz w łatwy
              i wygodny sposób wynająć pojazd dopasowany do Twoich potrzeb. Nie
              trać czasu na stanie w kolejce w wypożyczalni samochodowej,
              zarejestruj się i ciesz się swobodą podróżowania.
            </p>
            <Link to="/register" className="btn btn-hero">
              Dołącz do nas!
            </Link>
          </div>

          <img src={MainImage} alt="Rent a car" className="img main-img" />
        </div>
        <footer>
          <center>
            <p>
              Aplikacja zrealizowana w ramach pracy inżynierskiej przez Michała
              Michalskiego - studenta 4-tego roku informatyki inż.
            </p>
          </center>
        </footer>
      </div>
    </Wrapper>
  );
};

export default LandingPage;
