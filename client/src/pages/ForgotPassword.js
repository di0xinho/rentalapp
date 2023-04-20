import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { validateEmail } from "../utils/ValidationFunctions";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { toggleTheme } from "../redux/themeSlice";
import img from "../assets/images/loginimg.svg";
import Wrapper from "../assets/wrappers/ForgotPassword";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/forgot-password", values);
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
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
          <h1 className="login-title mt-5">Zapomniałeś hasła?</h1>
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

            <br></br>
            <button className="btn btn-primary btn-lg" type="submit">
              Prześlij dalej
            </button>
            <br></br>
            <br></br>
            <center>
              <Link to="/login" className="string">
                Przypomniało Ci się hasło? Wejdź tutaj!
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

export default ForgotPassword;
