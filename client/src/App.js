import React from "react";
import {
  LandingPage,
  HomePage,
  ErrorPage,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
} from "./pages";
import {
  Cars,
  Favorites,
  Profile,
  Settings,
  CarDetails,
  Booking,
  History, 
  Agreement,
} from "./pages/user";
import { AddNewCar, CarManager, EditCar } from "./pages/admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLayoutEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alerts);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const theme = localStorage.getItem("theme");

  useLayoutEffect(() => {
    function setTheme() {
      localStorage.setItem("theme", isDarkMode);
    }
    function setBackgroundColor() {
      document.body.style.backgroundColor = isDarkMode ? "#044e54" : "#87eaf2";
    }

    setTheme();
    setBackgroundColor();
  }, [theme, isDarkMode]);

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />

        {loading && (
          <div className="spinner-container">
            <BeatLoader color={"#2cb1bc"} size={150} />
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="*" element={<ErrorPage />}></Route>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/forgotpassword"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/resetpassword/:token"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/settings/:userId"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/allcars"
            element={
              <ProtectedRoute>
                <Cars />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/cardetails/:carId"
            element={
              <ProtectedRoute>
                <CarDetails />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/booking/:carId"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/agreement/:bookingId"
            element={
              <ProtectedRoute>
                <Agreement />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin/addnewcar"
            element={
              <ProtectedRoute>
                <AddNewCar />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin/carmanager"
            element={
              <ProtectedRoute>
                <CarManager />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin/editcar/:carId"
            element={
              <ProtectedRoute>
                <EditCar />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
