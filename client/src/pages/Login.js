import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { toggleTheme } from "../redux/themeSlice";
import Wrapper from "../assets/wrappers/Login";
import img from "../assets/images/loginimg.svg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/home");
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
          <h1 className="login-title mt-5">Logowanie</h1>
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
            <Form.Item label="Email" name="email">
              <Input placeholder="Email"></Input>
            </Form.Item>

            <Form.Item label="Hasło" name="password">
              <Input placeholder="Hasło" type="password"></Input>
            </Form.Item>

            <br></br>
            <button className="btn btn-primary btn-lg" type="submit">
              Zaloguj się
            </button>
            <br></br>
            <br></br>
            <center>
              <Link to="/register" className="string">
                Nie masz konta? Wejdź tutaj!
              </Link>
              <br></br>
              <br></br>
              <Link to="/forgotpassword" className="string">
                Nie pamiętasz hasła? Żaden problem!
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

export default Login;
