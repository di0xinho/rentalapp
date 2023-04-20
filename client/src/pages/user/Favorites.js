import React, { useState, useEffect } from "react";
import SharedLayout from "../../components/SharedLayout";
import MainWrapper from "../../assets/wrappers/SharedLayout";
import Wrapper from "../../assets/wrappers/Favorites";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { List, Card, Pagination, Form, Input, Select, Slider } from "antd";

const Favorites = () => {
  let fontSize = 50;
  const dispatch = useDispatch();
  const user = JSON.parse(Cookies.get("user"));
  const userFavoriteCars = user.user.favorites;
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayFavoriteCars = favoriteCars.slice(startIndex, endIndex);

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

      if (response.success) {
        getFavoriteCars();
        setPage(1);
      }

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

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    getFavoriteCars();
  }, []);

  return (
    <MainWrapper>
      <Wrapper>
        <SharedLayout>
          <h1 className="page-title">Lista ulubionych</h1>
          <hr />
          <div className="listOfFavoriteCars">
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={displayFavoriteCars}
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
              total={favoriteCars.length}
              onChange={onPageChange}
            />
          </div>
        </SharedLayout>
      </Wrapper>
    </MainWrapper>
  );
};

export default Favorites;
