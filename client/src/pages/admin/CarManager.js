import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  Pagination,
  Form,
  Input,
  Select,
  Slider,
  Table,
  Button,
} from "antd";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import SharedLayout from "../../components/SharedLayout";
import MainWrapper from "../../assets/wrappers/SharedLayout";
import Wrapper from "../../assets/wrappers/CarManager";
import PermissionDenied from "../../components/PermissionDenied";

const CarManager = () => {
  const user = JSON.parse(Cookies.get("user"));
  const role = user.user.isAdmin;
  const [cars, setCars] = useState([]);
  const dispatch = useDispatch();
  const range = [30, 100];

  const presentationMode = false;
  const adminMode = true;
  const [page, setPage] = useState(1);
  const pageSize = 7;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayCars = cars.slice(startIndex, endIndex);

  const { Option } = Select;
  const [form] = Form.useForm();

  const UserListColumns = [
    {
      title: "Marka",
      dataIndex: "make",
      key: "make",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Rok produkcji",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Ilość osób",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Kolor",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Rodzaj karoserii",
      dataIndex: "bodyType",
      key: "bodyType",
    },
    {
      title: "Rodzaj skrzyni biegów",
      dataIndex: "gearboxType",
      key: "gearboxType",
    },
    {
      title: "Rodzaj paliwa",
      dataIndex: "fuelType",
      key: "fuelType",
    },
    {
      title: "Przebieg",
      dataIndex: "mileage",
      key: "mileage",
    },
    {
      title: "Dostępność",
      dataIndex: "isAvailable",
      key: "isAvailable",
      render: (isAvailable) => (
        <span>
          {isAvailable ? <span>Dostępny</span> : <span>Niedostępny</span>}
        </span>
      ),
    },
    {
      title: "Akcje",
      dataIndex: "",
      key: "actions",
      render: (_, record) => (
        <Button type="link" danger>
          <Link to={`/admin/editcar/${record._id}`}>Zarządzaj pojazdem</Link>
        </Button>
      ),
    },
  ];

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

      dispatch(hideLoading());
      if (response.data.success) {
        setCars(response.data.data);
      }
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
        {
          values,
          adminMode,
        },
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
    console.log(role)
  }, []);

  if(role !== true){
    return <PermissionDenied/>
  }

  return (
    <MainWrapper>
      <Wrapper>
        <SharedLayout>
          <h1 className="page-title">Edycja ofert pojazdów</h1>
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
              <Form.Item
                className="form-item-isAvailable"
                name="isAvailable"
                label="Dostępność"
              >
                <Select className="select-isAvailable">
                  <Option value={true}>Dostępny</Option>
                  <Option value={false}>Niedostępny</Option>
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

          <Table
            columns={UserListColumns}
            dataSource={displayCars}
            pagination={false}
          />
          <Pagination
            current={page}
            pageSize={pageSize}
            total={cars.length}
            onChange={onPageChange}
          />
        </SharedLayout>
      </Wrapper>
    </MainWrapper>
  );
};

export default CarManager;
