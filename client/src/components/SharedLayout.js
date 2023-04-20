import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { Switch, Avatar } from "antd";
import UserMenu from "./UserMenu";
import AdminMenu from "./AdminMenu";
import { toggleTheme } from "../redux/themeSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/SharedLayout";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import {
  AiOutlineLogout,
  AiFillCrown,
  AiOutlineUser,
  AiFillCar,
  AiFillSetting,
} from "react-icons/ai";

function SharedLayout({ children }) {

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const { user } = useSelector((state) => state.user);

  let FontSize = 30;
  const [userId, setUserId] = useState();
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const Location = useLocation();
   
  const getUserId = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-userId", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserId(response.data.data.userId);
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const Logout = async () => {
    try {
      dispatch(showLoading());
      await axios.delete("/api/user/logout");
      dispatch(hideLoading());

      toast.success("Wylogowanie użytkownika przebiegło pomyślnie");
      localStorage.removeItem("token");
      Navigate("/login");
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Coś poszło nie tak");
    }
  };

  function setActive(path) {
    if (path === Location.pathname) {
      return true;
    } else return false;
  }

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const Menu = user?.isAdmin ? AdminMenu : UserMenu;
  const Role = user?.isAdmin ? "Administrator" : "Użytkownik";
  const Icon = user?.isAdmin ? AiFillCrown : AiOutlineUser;

  useEffect(() => {
    getUserId();
    setIsActive(setActive(`/settings/${userId}`));
  }, []);

  return (
    <Wrapper>
      <main className="dashboard">
        <nav>
          <p className="Account-role mt-5">
            <Icon size={FontSize} />
            Rodzaj konta: {Role}
          </p>
          <Link to="/profile" className="nickname mt-5">
            {user?.name}
          </Link>
          <div className="switch-dark-theme">
            <center>
              <Switch
                className="switch-theme mt-5"
                defaultChecked={isDarkMode}
                onChange={handleToggleTheme}
              />
            </center>
            <p className="switch-theme-title">Tryb ciemny</p>
          </div>
          <div className="avatar">
            <Link to="/profile">
              <Avatar className="avatar-icon" size={64} icon={<AiOutlineUser />} />
            </Link>
          </div>
        </nav>

        <div className="d-flex layout">
          <div className="sidebar">
            <div className="sidebar-header pb-4">
              <h1>
                Menu <AiFillCar />
              </h1>
            </div>

            <div className="menu">
              {Menu.map((menu) => {
                const isActive = setActive(menu.path);

                return (
                  <div
                    className={`d-flex menu-item ${
                      isActive && "active-menu-item"
                    }`}
                  >
                    <span>{menu.icon}</span>
                    <Link to={menu.path}>{menu.text}</Link>
                  </div>
                );
              })}

              <div className="settings">
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <span>{<AiFillSetting size={FontSize} />}</span>
                  <Link to={`/settings/${userId}`}>Ustawienia</Link>
                </div>
              </div>

              <div className={`d-flex menu-item`} onClick={Logout}>
                <span>{<AiOutlineLogout size={FontSize} />}</span>
                <Link to="/login">Wyloguj</Link>
              </div>
            </div>
          </div>

          <div className="content">{children}</div>
        </div>
      </main>
    </Wrapper>
  );
}

export default SharedLayout;
