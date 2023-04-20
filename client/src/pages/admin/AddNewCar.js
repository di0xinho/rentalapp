import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import SharedLayout from "../../components/SharedLayout";
import MainWrapper from "../../assets/wrappers/SharedLayout";
import Wrapper from "../../assets/wrappers/AddNewCar";
import { Card, Image, Form, Select, Input, InputNumber } from "antd";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NewCar from "../../assets/images/NewCar.jpg";
import PermissionDenied from "../../components/PermissionDenied";

const AddNewCar = () => {
  const [imageUrl, setImageUrl] = useState(NewCar);
  
  const { Option } = Select;
  const user = JSON.parse(Cookies.get("user"));
  const role = user.user.isAdmin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const onFinish = async (values) => {
    try {
      if (values.imageUrl === NewCar) {
        toast.error(
          "Wykryto domyślne zdjęcie dla nowego pojazdu. Wprowadź adres Url pojazdu, aby móc wystawić ofertę"
        );
      }
      values.bookedTimeSlots = [];
      values.isAvailable = true;
      dispatch(showLoading());

      const response = await axios.post(
        "/api/cars/add-new-car",
        { values },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(
          "Dodawanie nowej oferty pojazdu zakończyło się powodzeniem"
        );
        navigate("/home");
      } else {
        toast.error(
          "Dodawanie nowej oferty pojazdu zakończyło się niepowodzeniem"
        );
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  if (role !== true) {
    return <PermissionDenied />;
  }

  return (
    <MainWrapper>
      <Wrapper>
        <SharedLayout>
          <h1 className="page-title">Dodawanie nowego pojazdu</h1>
          <hr />

          <Card className="card-car-info" title={"Karta nowego pojazdu"}>
            <div className="adding-car-content">
              <div className="auto-image">
                <Image
                  className="image-car"
                  preview={NewCar}
                  height={300}
                  width={300}
                  src={imageUrl}
                />
              </div>

              <Form
                className="new-car-form"
                layout="vertical"
                size="large"
                onFinish={onFinish}
              >
                <Form.Item
                  label="Marka"
                  name="make"
                  rules={[
                    {
                      required: true,
                      message: "Proszę nazwę marki",
                    },
                  ]}
                >
                  <Input placeholder="Wprowadź markę" />
                </Form.Item>
                <Form.Item
                  label="Model"
                  name="model"
                  rules={[
                    {
                      required: true,
                      message: "Proszę wprowadzić nazwę modelu",
                    },
                  ]}
                >
                  <Input placeholder="Wprowadź model" />
                </Form.Item>
                <Form.Item
                  label="Ilość osób"
                  name="capacity"
                  rules={[
                    {
                      required: true,
                      message: "Proszę wybrać pojemność samochodu",
                    },
                  ]}
                >
                  <Select placeholder="Wybierz pojemność pojazdu">
                    <Option value="3">3</Option>
                    <Option value="5">5</Option>
                    <Option value="7">7</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Rok produkcji"
                  name="year"
                  rules={[
                    {
                      required: true,
                      type: "number",
                      min: 1970,
                      message:
                        "Proszę wprowadzić rok produkcji pojazdu (rok nie może być wcześniejszy niż 1970)",
                    },
                  ]}
                >
                  <InputNumber placeholder="Wprowadź rok produkcji" />
                </Form.Item>
                <Form.Item
                  label="Kolor"
                  name="color"
                  rules={[
                    {
                      required: true,
                      message: "Proszę wprowadzić nazwę koloru",
                    },
                  ]}
                >
                  <Select placeholder="Wybierz kolor">
                    <Option value="czarny">czarny</Option>
                    <Option value="biały">biały</Option>
                    <Option value="niebieski">niebieski</Option>
                    <Option value="szary">szary</Option>
                    <Option value="czerwony">czerwony</Option>
                    <Option value="granatowy">granatowy</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Adres URL do zdjęcia pojazdu"
                  name="imageUrl"
                  rules={[
                    {
                      type: "url",
                      required: true,
                      message: "Proszę wprowadzić adres URL do zdjęcia",
                    },
                  ]}
                >
                  <Input
                    type="url"
                    placeholder="Wprowadź adres URL"
                    onChange={handleImageUrlChange}
                  />
                </Form.Item>
                <Form.Item
                  label="Rodzaj karoserii"
                  name="bodyType"
                  rules={[
                    {
                      required: true,
                      message: "Proszę wprowadzić typ nadwozia pojazdu",
                    },
                  ]}
                >
                  <Select placeholder="Wprowadź typ karoserii">
                    <Option value="Sedan">Sedan</Option>
                    <Option value="Coupe">Coupe</Option>
                    <Option value="Hatchback">Hatchback</Option>
                    <Option value="SUV">SUV</Option>
                    <Option value="Crossover">Crossover</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Rodzaj skrzyni biegów"
                  name="gearboxType"
                  rules={[
                    {
                      required: true,
                      message: "Proszę wprowadzić rodzaj skrzyni biegów",
                    },
                  ]}
                >
                  <Select placeholder="Wprowadź typ skrzyni biegów">
                    <Option value="Manualna">Manualna</Option>
                    <Option value="Automatyczna">Automatyczna</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Przebieg (w km)"
                  name="mileage"
                  rules={[
                    {
                      required: true,
                      type: "number",
                      min: 0,
                      message: "Proszę wprowadzić liczbę dodatnią",
                    },
                  ]}
                >
                  <InputNumber placeholder="Wprowadź przebieg pojazdu" />
                </Form.Item>
                <Form.Item
                  label="Rodzaj paliwa"
                  name="fuelType"
                  rules={[
                    {
                      required: true,
                      message: "Proszę wybrać rodzaj paliwa",
                    },
                  ]}
                >
                  <Select placeholder="Wprowadź rodzaj paliwa">
                    <Option value="Benzyna">Benzyna</Option>
                    <Option value="Diesel">Diesel</Option>
                    <Option value="Elektryk">Elektryk</Option>
                    <Option value="Hybryda">Hybryda</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Cena za godzinę (w PLN)"
                  name="hourlyPrice"
                  rules={[
                    {
                      required: true,
                      type: "number",
                      min: 0,
                      message: "Proszę wprowadzić liczbę dodatnią",
                    },
                  ]}
                >
                  <InputNumber placeholder="Wprowadź cenę" />
                </Form.Item>
                <Form.Item
                  label="Szczegółowy opis pojazdu"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Proszę napisać szczegółowy opis pojazdu",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Dodaj szczegółowy opis pojazdu"
                    autoSize={{ maxRows: 4, minRows: 4 }}
                    style={{ resize: "none" }}
                    maxLength={500}
                    showCount={true}
                  />
                </Form.Item>
                <button className="btn btn-primary btn-lg" type="submit">
                  Utwórz nową ofertę
                </button>
              </Form>
            </div>
          </Card>
        </SharedLayout>
      </Wrapper>
    </MainWrapper>
  );
};

export default AddNewCar;
