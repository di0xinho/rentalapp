import React from "react";
import { AiFillHeart, AiFillFileText } from "react-icons/ai";
import { FaCar, FaHome, FaUserAlt } from "react-icons/fa";

let FontSize = 30;

const UserMenu = [
  {
    id: 1,
    text: "Strona domowa",
    path: "/home",
    icon: <FaHome size={FontSize} />,
  },
  {
    id: 2,
    text: "Samochody",
    path: "/allcars",
    icon: <FaCar size={FontSize} />,
  },
  {
    id: 3,
    text: "Historia wypożyczeń",
    path: "/history",
    icon: <AiFillFileText size={FontSize} />,
  },
  {
    id: 4,
    text: "Ulubione",
    path: "/favorites",
    icon: <AiFillHeart size={FontSize} />,
  },
  {
    id: 5,
    text: "Mój profil",
    path: "/profile",
    icon: <FaUserAlt size={FontSize} />,
  },
];

export default UserMenu;
