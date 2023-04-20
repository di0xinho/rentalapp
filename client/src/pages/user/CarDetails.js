import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SharedLayout from "../../components/SharedLayout";
import MainWrapper from "../../assets/wrappers/SharedLayout";
import Wrapper from "../../assets/wrappers/CarDetails";
import TechnicalSpecs from "../../components/TechnicalSpecs";
import { Card, Image, Alert } from "antd";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { AiFillCreditCard, AiFillShop } from "react-icons/ai";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const CarDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [car, setCar] = useState([]);
  const { carId } = useParams();
  const [isVisible, setIsVisible] = useState(false);

  const getCarDetails = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(`/api/cars/get-car-details/${carId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());

      if (response.data) {
        setCar(response.data.data);
      } else {
        toast.error("Nie udało się zwrócić informacji o pożądanym samochodzie");
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  function creditCardPayment() {
    try {
      dispatch(showLoading());

      navigate(`/booking/${carId}`, { state: { payment: true } });

      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
    }
  }

  function onsitePayment() {
    try {
      dispatch(showLoading());

      navigate(`/booking/${carId}`, { state: { payment: false } });

      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  function checkingCarAvailability(carAvailability) {
    if (carAvailability === false) {
      return (
        <Alert
          message="Ważne!"
          description="Oferta dla tego pojazdu jest na ten moment czasowo niedostępna."
          type="warning"
          banner={true}
          showIcon
        />
      );
    } else {
      return;
    }
  }

  useEffect(() => {
    getCarDetails();
  }, []);

  return (
    <MainWrapper>
      <Wrapper>
        <SharedLayout>
          <h1 className="page-title">Informacje o samochodzie</h1>
          <hr />

          <Card className="card-car-info" title={car.make + " " + car.model}>
            <div className="auto-content">
              <div className="auto-image">
                <Image
                  width={700}
                  src={car.imageUrl}
                  alt="Zdjęcie wystawowe samochodu"
                />
              </div>
              <div className="order">
                {checkingCarAvailability(car.isAvailable)}
                <button
                  className="btn btn-primary btn-lg"
                  type="submit"
                  onClick={toggleVisibility}
                  disabled={checkingCarAvailability(car.isAvailable)}
                >
                  Wypożycz już teraz
                </button>
                <TransitionGroup>
                  {isVisible && (
                    <CSSTransition classNames="fade" timeout={500}>
                      <div className="payment" onClick={creditCardPayment}>
                        <h5>Zapłać kartą</h5>
                        <AiFillCreditCard size={60} />
                      </div>
                    </CSSTransition>
                  )}
                  {isVisible && (
                    <CSSTransition classNames="fade" timeout={500}>
                      <div className="payment" onClick={onsitePayment}>
                        <h5>Zapłać na miejscu</h5>
                        <AiFillShop size={60} />
                      </div>
                    </CSSTransition>
                  )}
                </TransitionGroup>
              </div>
              <div className="auto-info">
                <TechnicalSpecs
                  make={car.make}
                  model={car.model}
                  capacity={car.capacity}
                  year={car.year}
                  color={car.color}
                  bodyType={car.bodyType}
                  gearboxType={car.gearboxType}
                  mileage={car.mileage}
                  fuelType={car.fuelType}
                  hourlyPrice={car.hourlyPrice}
                />
              </div>
            </div>
          </Card>
        </SharedLayout>
      </Wrapper>
    </MainWrapper>
  );
};

export default CarDetails;
