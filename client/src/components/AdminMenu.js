import React from 'react';
import {
  AiFillPlusCircle,
  AiFillEdit,
  AiFillHeart,
  AiFillFileText
} from "react-icons/ai";
import { FaCar, FaHome, FaUserAlt } from "react-icons/fa";

let FontSize = 30;

const AdminMenu = [
  {
    id: 1,
    text: "Strona domowa",
    path: "/home",
    icon: <FaHome size={FontSize} />,
  },
  {
    id: 2,
    text: "Dodaj nowe auto",
    path: "/admin/addnewcar",
    icon: <AiFillPlusCircle size={FontSize} />,
  },
  {
    id: 3,
    text: "Zarządzaj pojazdami",
    path: "/admin/carmanager",
    icon: <AiFillEdit size={FontSize} />,
  },
  {
    id: 4,
    text: "Samochody",
    path: "/allcars",
    icon: <FaCar size={FontSize} />,
  },
  {
    id: 5,
    text: "Historia wypożyczeń",
    path: "/history",
    icon: <AiFillFileText size={FontSize} />,
  },
  {
    id: 6,
    text: "Ulubione",
    path: "/favorites",
    icon: <AiFillHeart size={FontSize} />,
  },
  {
    id: 7,
    text: "Mój profil",
    path: "/profile",
    icon: <FaUserAlt size={FontSize} />,
  },
];

export default AdminMenu;
