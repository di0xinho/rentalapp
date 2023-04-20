import React, { useEffect, useState } from "react";
import axios from "axios";
import { Descriptions } from "antd";
import SharedLayout from "../../components/SharedLayout";
import MainWrapper from "../../assets/wrappers/SharedLayout";
import Wrapper from "../../assets/wrappers/Profile";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import moment from "moment";

const Profile = () => {
  let counter = 0;
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);

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

  function setDescriptionValue(value) {
    if (value === null) {
      counter = counter + 1;
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

  function setInformationAboutLackOfData() {
    if (counter > 0) {
      return (
        <div className="lackOfData-info">
          <p>
            * Dokończ konfigurację swojego konta, ponieważ wciąż istnieją braki
            danych. Uzupełnij je poprzez wejście do ustawień i edycję swojego
            profilu.
          </p>
        </div>
      );
    } else {
      return (
        <div className="lackOfData-info">
          <p>
            Wszystkie dane dla tego profilu zostały uzupełnione. Jeśli chcesz je
            edytować możesz po prostu wejść w ustawienia i edytować interesujące
            Cię pole lub pola.
          </p>
        </div>
      );
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <MainWrapper>
      <Wrapper>
        <SharedLayout>
          <h1 className="page-title">Informacje o użytkowniku</h1>
          <hr />
          <Descriptions bordered>
            <Descriptions.Item label="Login">
              {setDescriptionValue(user.name)}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {setDescriptionValue(user.email)}
            </Descriptions.Item>
            <Descriptions.Item label="Data utworzenia konta">
              {setDescriptionValue(
                moment(user.createdAt).format("DD-MM-YYYY HH:mm:ss")
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Imię">
              {setDescriptionValue(user.firstName)}
            </Descriptions.Item>
            <Descriptions.Item label="Nazwisko">
              {setDescriptionValue(user.surname)}
            </Descriptions.Item>
            <Descriptions.Item label="Numer telefonu">
              {setDescriptionValue(user.phoneNumber)}
            </Descriptions.Item>
            <Descriptions.Item label="Data urodzenia">
              {setDescriptionValue(
                moment(user.dateOfBirth).format("DD-MM-YYYY")
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Płeć">
              {setDescriptionValue(user.sex)}
            </Descriptions.Item>
            <Descriptions.Item label="Rodzaj konta">
              {setRole(user.isAdmin)}
            </Descriptions.Item>
          </Descriptions>
          {setInformationAboutLackOfData()}
          <hr />
        </SharedLayout>
      </Wrapper>
    </MainWrapper>
  );
};

export default Profile;
