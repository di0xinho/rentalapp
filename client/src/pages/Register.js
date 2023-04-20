import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { validateEmail, validatePassword } from "../utils/ValidationFunctions";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { toggleTheme } from "../redux/themeSlice";
import Wrapper from "../assets/wrappers/Register";
import img from "../assets/images/loginimg.svg";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Coś poszło nie tak");
    }
  };

  

  return (
    <Wrapper>
      <div className="Authentication">
        <div className="Authentication-form card p-5">
          <h1 className="register-title">Rejestracja</h1>
          <center>
            <img
              src={img}
              alt="logo"
              className="img main-img"
              width="200px;"
              height="200px;"
              margin-left="auto;"
              margin-right="auto;"
              display="block;"
            ></img>
          </center>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Login" name="name">
              <Input placeholder="Login"></Input>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Wprowadź poprawny adres email",
                },
                {
                  validator: validateEmail,
                },
              ]}
            >
              <Input placeholder="Email"></Input>
            </Form.Item>

            <Form.Item
              className="password"
              label="Hasło"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Wprowadź hasło",
                },
                { validator: validatePassword },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              className="confirm"
              label="Powtórz hasło"
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Powtórz hasło",
                },
                { validator: validatePassword },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <br></br>
            <button className="btn btn-primary btn-lg" type="submit">
              Załóż konto
            </button>
            <br></br>
            <br></br>

            <center>
              <Link to="/login" className="string">
                Masz już konto? Kliknij tutaj!
              </Link>
            </center>
            <center>
              <Switch
                className="switch-theme mt-4"
                defaultChecked={isDarkMode}
                onChange={handleToggleTheme}
              />
              <p className="switch-theme-title mt-2">Tryb ciemny</p>
            </center>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;
