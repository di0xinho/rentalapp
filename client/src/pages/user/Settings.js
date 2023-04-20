import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Form, Input, DatePicker, Select, Descriptions, Switch } from "antd";
import axios from "axios";
import moment from "moment";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useNavigate } from "react-router-dom";
import SharedLayout from "../../components/SharedLayout";
import MainWrapper from "../../assets/wrappers/SharedLayout";
import Wrapper from "../../assets/wrappers/Settings";
import { useParams } from "react-router-dom";

const Settings = () => {
  const [user, setUser] = useState([]);
  const [disabledDate, setDisabledDate] = useState(
    (current) => current && current > moment().endOf("day")
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { Option } = Select;

  const onFinish = async (values) => {
    try {
      if (values.dateOfBirth === null) {
        toast.error("Ustaw prawidłową datę urodzenia");
      } else {
        dispatch(showLoading());
        const response = await axios.post(
          `/api/user/update/${userId}`,
          { values },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());

        if (response.data) {
          navigate("/profile");
          toast.success("Profil użytkownika został zaktualizowany pomyślnie");
        } else {
          toast.error("Nie udało się zaktualizować profilu użytkownika");
        }
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Coś poszło nie tak");
    }
  };

  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(hideLoading());
      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  function handleSwitchChange(checked) {
    setIsButtonDisabled(checked);
    setIsInputDisabled(!isInputDisabled);
  }

  function handleDisabledDate(current) {
    return current && current > moment().endOf("day");
  }

  function handleKeyPress(event) {
    if (event.key === " ") {
      event.preventDefault();
    }
  }

  function getDateOrNull(date) {
    const selectedDate = moment(date, "DD-MM-YYYY", true);
    return selectedDate.isValid() ? selectedDate.toDate() : null;
  }

  function setDescriptionValue(value) {
    if (value === null) {
      return "Nieprzypisano";
    } else {
      return value;
    }
  }

  function setRole(value) {
    if (value === true) {
      return "Administrator";
    } else {
      return "Użytkownik";
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <MainWrapper>
      <Wrapper>
        <SharedLayout>
          <h1 className="page-title">Ustawienia</h1>
          <hr />

          <div className="edit-profile">
            <h2>Edycja danych profilowych</h2>
            <Form
              layout="vertical"
              onFinish={onFinish}
              size="large"
              fields={[
                {
                  name: ["name"],
                  value: user.name,
                },
                {
                  name: ["email"],
                  value: user.email,
                },
                {
                  name: ["isAdmin"],
                  value: setRole(user.isAdmin),
                },
                {
                  name: ["firstName"],
                  value: user.firstName,
                },
                {
                  name: ["surname"],
                  value: user.surname,
                },
                {
                  name: ["phoneNumber"],
                  value: user.phoneNumber,
                },
                {
                  name: ["dateOfBirth"],
                  value: getDateOrNull(user.dateOfBirth),
                },
                {
                  name: ["sex"],
                  value: user.sex,
                },
              ]}
            >
              <Form.Item label="Login" name="name">
                <Input className="blocked-input" disabled={true} />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input className="blocked-input" disabled={true} />
              </Form.Item>
              <Form.Item label="Rodzaj konta" name="isAdmin">
                <Input className="blocked-input" disabled={true} />
              </Form.Item>
              <Form.Item label="Imię" name="firstName">
                <Input placeholder="Wprowadź imię" disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item label="Nazwisko" name="surname">
                <Input
                  placeholder="Wprowadź nazwisko"
                  disabled={isInputDisabled}
                />
              </Form.Item>
              <Form.Item
                label="Numer telefonu"
                name="phoneNumber"
                rules={[
                  {
                    pattern: /^(?:(?:(?:\+|00)48)|(?:0))?\s*(?:\d\s*){9}$/,
                    message:
                      "Wprowadź poprawny numer telefonu. Numer ten powinien składać się z 9 cyfr. Może on być też podawany wraz z numerem kierunkowym.",
                  },
                ]}
              >
                <Input
                  onKeyPress={handleKeyPress}
                  placeholder="Wprowadź numer telefonu"
                  disabled={isInputDisabled}
                />
              </Form.Item>
              <Form.Item label="Data urodzenia" name="dateOfBirth">
                <DatePicker
                  format="DD-MM-YYYY"
                  placeholder="Wybierz datę urodzenia"
                  disabledDate={handleDisabledDate}
                  disabled={isInputDisabled}
                />
              </Form.Item>
              <Descriptions bordered>
                <Descriptions.Item label="Data urodzenia">
                  {setDescriptionValue(
                    moment(user.dateOfBirth).format("DD-MM-YYYY")
                  )}
                </Descriptions.Item>
              </Descriptions>
              <Form.Item label="Płeć" name="sex">
                <Select disabled={isInputDisabled}>
                  <Option value="Mężczyzna">Mężczyzna</Option>
                  <Option value="Kobieta">Kobieta</Option>
                  <Option value="inna">Inna</Option>
                </Select>
              </Form.Item>

              <button
                className="btn btn-primary btn-lg"
                type="submit"
                disabled={isButtonDisabled}
              >
                Aktualizuj dane
              </button>
              <Switch
                className="switch"
                defaultChecked={isButtonDisabled}
                onChange={handleSwitchChange}
              />
            </Form>
          </div>
          <hr />
        </SharedLayout>
      </Wrapper>
    </MainWrapper>
  );
};

export default Settings;
