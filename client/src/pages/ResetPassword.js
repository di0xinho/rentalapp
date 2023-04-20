import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { validatePassword } from "../utils/ValidationFunctions";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import img from "../assets/images/loginimg.svg";
import Wrapper from "../assets/wrappers/ResetPassword";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(`/api/user/reset-password/${token}`, {
        password,
        confirmPassword,
      });
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
          <h1 className="login-title mt-5">Wprowadź nowe hasło</h1>
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
              label="Hasło"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Wprowadź hasło",
                },
                {
                  validator: validatePassword,
                },
              ]}
              hasFeedback
            >
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Powtórz hasło"
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Powtórz hasło",
                },
                {
                  validator: validatePassword,
                },
              ]}
            >
              <Input.Password
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>

            <br></br>
            <button className="btn btn-primary btn-lg" type="submit">
              Resetuj hasło
            </button>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default ResetPassword;
