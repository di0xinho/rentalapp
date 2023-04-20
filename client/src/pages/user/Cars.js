import React, { useEffect, useState } from "react";
import { List, Card, Pagination, Form, Input, Select, Slider } from "antd";
import SharedLayout from "../../components/SharedLayout";
import MainWrapper from "../../assets/wrappers/SharedLayout";
import Wrapper from "../../assets/wrappers/Cars";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Cars = () => {
  let fontSize = 50;
  const dispatch = useDispatch();
  const [cars, setCars] = useState([]);
  const user = JSON.parse(Cookies.get("user"));
  const userFavoriteCars = user.user.favorites;
  const [favoriteCars, setFavoriteCars] = useState([]);
  const presentationMode = true;
  const adminMode = false;
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayCars = cars.slice(startIndex, endIndex);
  const { Option } = Select;
  const [form] = Form.useForm();
  const range = [30, 100];

  const getCarsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/cars/get-all-cars",
        { presentationMode },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setCars(response.data.data);
      }

      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const getFavoriteCars = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/cars/get-favorite-cars",
        { userFavoriteCars },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setFavoriteCars(response.data.data);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const addToFavorites = async (carId) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/cars/add-to-favorite-cars",
        { carId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Dodano do listy ulubionych");
      }

      if (response.status === 201) {
        toast.success("Usunięto z listy ulubionych");
      }

      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const onFinish = async (values) => {
    try {
      if (values.hourlyPrice === undefined) {
        values.hourlyPrice = range;
      }

      dispatch(showLoading());
      const response = await axios.post(
        "/api/cars/search-for-cars",
        { values, adminMode },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success("Zwrócono listę wyszukiwanych samochodów");
        setCars(response.data.data);
        setPage(1);
      } else {
        toast.error("Nie udało się wyszukać samochodów");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Błąd podczas wyszukiwania samochodów");
    }
  };

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  function handleKeyPress(event) {
    if (event.key === " ") {
      event.preventDefault();
    }
  }

  useEffect(() => {
    getCarsData();
    getFavoriteCars();
  }, []);

  return (
    <MainWrapper>
      <Wrapper>
        <SharedLayout>
          <h1 className="page-title">Lista Samochodów</h1>
          <hr />

          <Card className="filter">
            <Form form={form} layout="inline" onFinish={onFinish}>
              <Form.Item name="make" label="Marka">
                <Input placeholder="Wpisz markę samochodu" />
              </Form.Item>
              <Form.Item name="model" label="Model">
                <Input placeholder="Wpisz model samochodu" />
              </Form.Item>
              <Form.Item
                name="year"
                label="Rok produkcji"
                parser={(value) => Number(value)}
              >
                <Input
                  placeholder="Wpisz rok produkcji"
                  onKeyPress={handleKeyPress}
                />
              </Form.Item>
              <Form.Item label="Wybierz przedział cenowy" name="hourlyPrice">
                <Slider
                  range
                  defaultValue={range}
                  value={range}
                  max={120}
                  className="slider-hourlyPrice"
                />
              </Form.Item>
              <Form.Item name="color" label="Kolor">
                <Select className="select-color">
                  <Option className="custom-option" value="czarny">
                    czarny
                  </Option>
                  <Option className="custom-option" value="biały">
                    biały
                  </Option>
                  <Option className="custom-option" value="niebieski">
                    niebieski
                  </Option>
                  <Option className="custom-option" value="szary">
                    szary
                  </Option>
                  <Option className="custom-option" value="czerwony">
                    czerwony
                  </Option>
                  <Option className="custom-option" value="granatowy">
                    granatowy
                  </Option>
                  <Option className="custom-option" value="" />
                </Select>
              </Form.Item>
              <Form.Item name="bodyType" label="Karoseria">
                <Select className="select-bodyType">
                  <Option value="Sedan">Sedan</Option>
                  <Option value="Coupe">Coupe</Option>
                  <Option value="Hatchback">Hatchback</Option>
                  <Option value="SUV">SUV</Option>
                  <Option value="Crossover">Crossover</Option>
                  <Option value="" />
                </Select>
              </Form.Item>
              <Form.Item name="gearboxType" label="Skrzynia biegów">
                <Select className="select-gearboxType">
                  <Option value="Manualna">Manualna</Option>
                  <Option value="Automatyczna">Automatyczna</Option>
                  <Option value="" />
                </Select>
              </Form.Item>
              <Form.Item
                className="form-item-fuelType"
                name="fuelType"
                label="Rodzaj paliwa"
              >
                <Select className="select-fuelType">
                  <Option value="Benzyna">Benzyna</Option>
                  <Option value="Diesel">Diesel</Option>
                  <Option value="Elektryk">Elektryk</Option>
                  <Option value="Hybryda">Hybryda</Option>
                  <Option value="" />
                </Select>
              </Form.Item>
              <Form.Item
                className="form-item-capacity"
                name="capacity"
                label="Ilość osób"
              >
                <Select className="select-capacity">
                  <Option value="3">3</Option>
                  <Option value="5">5</Option>
                  <Option value="7">7</Option>
                  <Option value="" />
                </Select>
              </Form.Item>

              <button className="btn btn-sm" type="sumbit">
                Szukaj
              </button>
              <button
                onClick={() => {
                  form.resetFields();
                }}
                className="btn btn-sm"
                type="button"
              >
                Wyczyść filtr
              </button>
            </Form>
          </Card>

          <div className="listOfCars">
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={displayCars}
              renderItem={(car) => (
                <List.Item>
                  <Card
                    cover={
                      <img
                        alt={car.make + " " + car.model}
                        src={car.imageUrl}
                        className="car-card"
                      />
                    }
                  >
                    <Card.Meta
                      title=<Link to={`/cardetails/${car._id.toString()}`}>
                        {car.make + " " + car.model}
                      </Link>
                      description={
                        <div className="card-content">
                          <div className="car-info">
                            Rok produkcji: {car.year}
                            <br />
                            Kolor: {car.color}
                            <br />
                            Przebieg: {car.mileage} km
                            <br />
                            Cena za godzinę jazdy: {car.hourlyPrice} zł
                          </div>
                          <div className="favorite">
                            <AiFillHeart
                              onClick={() => {
                                addToFavorites(car._id.toString());
                              }}
                              size={fontSize}
                            />
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />

            <Pagination
              current={page}
              pageSize={pageSize}
              total={cars.length}
              onChange={onPageChange}
            />
          </div>
          <hr />
        </SharedLayout>
      </Wrapper>
    </MainWrapper>
  );
};

export default Cars;
