import React, { useEffect, useState } from "react";
import SharedLayout from "../../components/SharedLayout";
import MainWrapper from "../../assets/wrappers/SharedLayout";
import Wrapper from "../../assets/wrappers/EditCar";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Image, Card, Form, Input, InputNumber, Select, Modal } from "antd";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import PermissionDenied from "../../components/PermissionDenied";

const EditCar = () => {
  const user = JSON.parse(Cookies.get("user"));
  const role = user.user.isAdmin;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [car, setCar] = useState([]);
  const [carData, setCarData] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { carId } = useParams();

  const { Option } = Select;

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

  const editCarDetails = async () => {
    try {
      setIsEditModalVisible(false);

      dispatch(showLoading());
      const response = await axios.post(
        `/api/cars/edit-car/${carId}`,
        { carData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data) {
        navigate("/admin/carmanager");
        toast.success(
          "Oferta dla tego pojazdu została pomyślnie zaktualizowana"
        );
      } else {
        toast.error("Nie udało się zaktualizować oferty dla tego pojazdu");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Coś poszło nie tak");
    }
  };

  const deleteCarDetails = async () => {
    try {
      setIsDeleteModalVisible(false);
      dispatch(showLoading());
      await axios.get(`/api/cars/delete-car/${carId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      toast.success(
        "Usuwanie oferty dla tego pojazdu zakończyło się powodzeniem"
      );
      navigate("/admin/carmanager");
    } catch (error) {
      dispatch(hideLoading());
      toast.error(
        "Usuwanie oferty dla tego pojazdu zakończyło się niepowodzeniem"
      );
    }
  };

  const handleShowEditModal = (data) => {
    setIsEditModalVisible(true);
    setCarData(data);
  };

  const handleShowDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
  };

  useEffect(() => {
    getCarDetails();
  }, []);

  if(role !== true){
    return <PermissionDenied/>
  }

  return (
    <MainWrapper>
      <Wrapper>
        <SharedLayout>
          <h1 className="page-title">Edycja pojazdu</h1>
          <hr />
          <Card className="card-car-info" title={"Karta samochodu"}>
            <div className="adding-car-content">
              <div className="auto-image">
                <Image
                  className="image-car"
                  height={300}
                  width={300}
                  preview={true}
                  src={car.imageUrl}
                  alt="Zdjęcie wystawowe samochodu"
                />
              </div>
              <div className="auto-form">
                <Form
                  layout="vertical"
                  onFinish={handleShowEditModal}
                  size="large"
                  fields={[
                    {
                      name: ["make"],
                      value: car.make,
                    },
                    {
                      name: ["model"],
                      value: car.model,
                    },
                    {
                      name: ["year"],
                      value: car.year,
                    },
                    {
                      name: ["capacity"],
                      value: car.capacity,
                    },
                    {
                      name: ["color"],
                      value: car.color,
                    },
                    {
                      name: ["bodyType"],
                      value: car.bodyType,
                    },
                    {
                      name: ["gearboxType"],
                      value: car.gearboxType,
                    },
                    {
                      name: ["mileage"],
                      value: car.mileage,
                    },
                    ,
                    {
                      name: ["fuelType"],
                      value: car.fuelType,
                    },
                    {
                      name: ["hourlyPrice"],
                      value: car.hourlyPrice,
                    },
                    {
                      name: ["imageUrl"],
                      value: car.imageUrl,
                    },
                    {
                      name: ["description"],
                      value: car.description,
                    },
                    {
                      name: ["isAvailable"],
                      value: car.isAvailable,
                    },
                  ]}
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
                    <Input type="url" placeholder="Wprowadź adres URL" />
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
                    label="Dostępność"
                    name="isAvailable"
                    rules={[
                      {
                        required: true,
                        message: "Proszę określić dostępność pojazdu",
                      },
                    ]}
                  >
                    <Select placeholder="Wprowadź dostępność pojazdu">
                      <Option value={true}>Dostępny</Option>
                      <Option value={false}>Niedostępny</Option>
                    </Select>
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

                  <button className="btn btn-sm" type="sumbit">
                    Aktualizuj dane
                  </button>
                </Form>

                <button className="btn btn-sm" onClick={handleShowDeleteModal}>
                  Usuń dane
                </button>

                <Modal
                  className="modal-edit"
                  open={isEditModalVisible}
                  onCancel={handleCancelModal}
                  onOk={editCarDetails}
                  title="Czy na pewno chcesz edytować ofertę tego pojazdu?"
                  okText="Tak"
                  cancelText="Przerwij"
                >
                  <p>W każdej chwili możesz z powrotem edytować tą ofertę.</p>
                </Modal>

                <Modal
                  className="modal-delete"
                  open={isDeleteModalVisible}
                  onCancel={handleCancelModal}
                  onOk={deleteCarDetails}
                  title="Czy na pewno chcesz usunąć ofertę tego pojazdu?"
                  okText="Tak"
                  cancelText="Anuluj"
                >
                  <p>Ta operacja jest nieodwracalna.</p>
                </Modal>
              </div>
            </div>
          </Card>
        </SharedLayout>
      </Wrapper>
    </MainWrapper>
  );
};

export default EditCar;
