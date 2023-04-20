import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { Image, DatePicker, Checkbox, Descriptions, Modal } from "antd";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import SharedLayout from "../../components/SharedLayout";
import MainWrapper from "../../assets/wrappers/SharedLayout";
import Wrapper from "../../assets/wrappers/Booking";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import locale from "antd/es/date-picker/locale/pl_PL";
import ClosedOffer from "../../components/ClosedOffer";

const Booking = () => {
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const PublishableKey =
    "";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { carId } = useParams();
  const [car, setCar] = useState([]);
  const user = JSON.parse(Cookies.get("user"));
  const { RangePicker } = DatePicker;

  const onToken = (token) => {
    const reqObj = {
      token,
      user: user.user._id,
      car: carId,
      totalHours,
      totalPrice,
      driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    order(reqObj);
  };

  const onOrder = () => {
    const reqObj = {
      user: user.user._id,
      car: carId,
      totalHours,
      totalPrice,
      driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    setIsModalVisible(false);
    bookWithoutPayment(reqObj);
  };

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

  const order = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/bookings/booking-car",
        { values },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data) {
        toast.success(
          "Udało Ci się wypożyczyć pojazd. Przyjedź do nas w uzgodnionym w wypożyczeniu terminie!"
        );
        navigate("/allcars");
      } else {
        toast.error("Nie udało się zrealizować opcji wypożyczenia pojazdu");
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const bookWithoutPayment = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/bookings/booking-without-payment",
        { values },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data) {
        toast.success(
          "Udało Ci się wypożyczyć pojazd. Przyjedź do nas w uzgodnionym w wypożyczeniu terminie!"
        );
        navigate("/allcars");
      } else {
        toast.error("Nie udało się zrealizować opcji wypożyczenia pojazdu");
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  function blockedDate(current) {
    return current && current < moment().startOf("hour");
  }

  function selectTimeSlots(values) {
    if (values !== null) {
      const fromDate = values[0].format("YYYY-MM-DD HH:mm");
      const toDate = values[1].format("YYYY-MM-DD HH:mm");
      const hours = Math.ceil(values[1].diff(values[0], "seconds") / 3600);
      setTotalHours(hours);
      setIsButtonDisabled(false);
      setFrom(fromDate);
      setTo(toDate);
    } else {
      setFrom(null);
      setTo(null);
      setTotalHours(null);
      setIsButtonDisabled(true);
      setTotalPrice(0);
    }
  }

  function onClear() {
    setIsButtonDisabled(true);
  }

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getCarDetails();
    setTotalPrice(totalHours * car.hourlyPrice);
    if (driver) {
      setTotalPrice(totalPrice + 40 * totalHours);
    }
  }, [driver, totalHours, car.hourlyPrice]);

  if (car.isAvailable === false) {
    return <ClosedOffer />;
  }

  return (
    <MainWrapper>
      <Wrapper>
        <SharedLayout>
          <h1 className="page-title">Personalizacja oferty i płatność</h1>
          <hr />
          <div className="payment-div">
            <h3>Personalizacja oferty</h3>
            <div className="offer-info">
              <Image
                className="auto-img"
                width={400}
                src={car.imageUrl}
                alt="Zdjęcie wystawowe samochodu"
              />
              <div className="details">
                <Descriptions
                  title="Skrócony opis oferty samochodu"
                  bordered
                  column={1}
                >
                  <Descriptions.Item label="Marka">
                    {car.make}
                  </Descriptions.Item>
                  <Descriptions.Item label="Model">
                    {car.model}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ilość osób">
                    {car.capacity}
                  </Descriptions.Item>
                  <Descriptions.Item label="Rok produkcji">
                    {car.year}
                  </Descriptions.Item>
                  <Descriptions.Item label="Kolor">
                    {car.color}
                  </Descriptions.Item>
                  <Descriptions.Item label="Rodzaj paliwa">
                    {car.fuelType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cena za godzinę">
                    {car.hourlyPrice}zł
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <div>
                <RangePicker
                  className="rangePicker"
                  showTime={{ format: "HH:mm" }}
                  bordered
                  disabledDate={blockedDate}
                  onChange={selectTimeSlots}
                  format="YYYY-MM-DD HH:mm"
                  locale={{
                    ...locale,
                    lang: {
                      ...locale.lang,
                      now: "Czas",
                      ok: "Zatwierdź",
                    },
                  }}
                />
                <Checkbox
                  className="checkbox-isDriver"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setdriver(true);
                    } else {
                      setdriver(false);
                    }
                  }}
                >
                  Wynajem z kierowcą
                </Checkbox>

                <h2 className="totalPrice">Całkowita suma: {totalPrice} zł</h2>
              </div>
            </div>
            {location.state.payment === true && (
              <div className="stripe-checkout-button">
                <StripeCheckout
                  name="Płatność kartą"
                  description="Wypełnij wymagane pola"
                  image="https://stripe.com/img/documentation/checkout/marketplace.png"
                  email={user.user.email}
                  locale="pl"
                  token={onToken}
                  stripeKey={PublishableKey}
                  currency="PLN"
                  disabled={isButtonDisabled}
                  panelLabel="Zapłać"
                >
                  <button
                    disabled={isButtonDisabled}
                    className="btn btn-primary btn-lg"
                    type="button"
                  >
                    Zapłać
                  </button>
                </StripeCheckout>
              </div>
            )}

            {location.state.payment === false && (
              <div className="order-button">
                <button
                  disabled={isButtonDisabled}
                  onClick={handleShowModal}
                  className="btn btn-primary btn-lg"
                  type="button"
                >
                  Zarezerwuj
                </button>
              </div>
            )}

            <Modal
              open={isModalVisible}
              onCancel={handleCancelModal}
              onOk={onOrder}
              title="Czy na pewno chcesz dokonać rezerwacji tego samochodu?"
              okText="Zatwierdź"
              cancelText="Anuluj"
            >
              <p>
                Rezerwacja wiąże się z obowiązkiem uiszczenia opłaty przed
                odebraniem pojazdu z wypożyczalni. Operacja ta jest wiążąca.
              </p>
            </Modal>
          </div>
        </SharedLayout>
      </Wrapper>
    </MainWrapper>
  );
};

export default Booking;
