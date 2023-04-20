import React, { useState, useEffect } from "react";
import SharedLayout from "../../components/SharedLayout";
import MainWrapper from "../../assets/wrappers/SharedLayout";
import Wrapper from "../../assets/wrappers/History";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Table,
  Form,
  Card,
  Input,
  Select,
  DatePicker,
  Pagination,
  Button,
} from "antd";
import { useDispatch } from "react-redux";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import locale from "antd/es/date-picker/locale/pl_PL";

const History = () => {
  const user = JSON.parse(Cookies.get("user"));
  const dispatch = useDispatch();
  const { Option } = Select;
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;

  const adminMode = user.user?.isAdmin;
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayHistory = history.slice(startIndex, endIndex);
  const fontSize = 25;

  const historyColumns = [
    {
      title: "Numer ID zamówienia (szczegóły zamówienia)",
      dataIndex: "_id",
      key: "_id",
      render: (text, record) => (
        <Link target="_blank" to={`/agreement/${record._id}`}>
          {text}
        </Link>
      ),
    },
    {
      title: "Numer ID użytkownika",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Numer ID samochodu",
      dataIndex: ["car", "_id"],
      key: "id",
      render: (text, record) => (
        <Link to={`/cardetails/${record.car["_id"]}`}>{text}</Link>
      ),
    },
    {
      title: "Marka samochodu",
      dataIndex: ["car", "make"],
      key: "make",
    },
    {
      title: "Model samochodu",
      dataIndex: ["car", "model"],
      key: "model",
    },
    {
      title: "Data rozpoczęcia wypożyczenia",
      dataIndex: ["bookedTimeSlots", "from"],
      key: "from",
      render: (from) => moment(from).format("DD-MM-YYYY HH:mm"),
    },
    {
      title: "Data zakończenia wypożyczenia",
      dataIndex: ["bookedTimeSlots", "to"],
      key: "to",
      render: (to) => moment(to).format("DD-MM-YYYY HH:mm"),
    },
    {
      title: "Status płatności",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid) => (
        <>
          {isPaid ? (
            <FaThumbsUp color="green" size={fontSize} />
          ) : (
            <FaThumbsDown color="red" size={fontSize} />
          )}
        </>
      ),
    },
  ];

  const getHistory = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/bookings/get-history",
        { adminMode },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (response.data.success) {
        setHistory(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const onFinish = async (values) => {
    if (values.from !== undefined) {
      values.from = values.from.format("YYYY-MM-DD");
    }
    if (values.to !== undefined) {
      values.to = values.to.format("YYYY-MM-DD");
    }

    if (values.user === "") {
      values.user = undefined;
    }

    if (values.carId === "") {
      values.carId = undefined;
    }

    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/bookings/search-for-bookings",
        { values, adminMode },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success("Zwrócono listę wypożyczeń");
        setHistory(response.data.data);
        setPage(1);
      } else {
        toast.error("Nie udało się zwrócić listy wypożyczeń");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Błąd podczas wyszukiwania wypożyczeń");
    }
  };

  
  function handleKeyPress(event) {
    if (event.key === " ") {
      event.preventDefault();
    }
  }

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <MainWrapper>
      <Wrapper>
        <SharedLayout>
          <h1 className="page-title">Historia wypożyczeń</h1>
          <hr />

          <Card className="filter">
            <Form form={form} layout="inline" onFinish={onFinish}>
              <Form.Item name="user" label="Numer id użytkownika">
                <Input
                  className="userId-input"
                  onKeyPress={handleKeyPress}
                  placeholder="Wpisz numer id użytkownika"
                />
              </Form.Item>
              <Form.Item name="carId" label="Numer id samochodu">
                <Input
                  onKeyPress={handleKeyPress}
                  placeholder="Wpisz numer id samochodu"
                />
              </Form.Item>
              <Form.Item name="make" label="Marka">
                <Input placeholder=" Wpisz markę pojazdu" />
              </Form.Item>
              <Form.Item name="model" label="Model">
                <Input placeholder="Wpisz model pojazdu" />
              </Form.Item>
              <Form.Item name="color" label="Kolor">
                <Select className="select-color">
                  <Option className="custom-option" value="czarny">
                    czarny
                  </Option>
                  <Option className="custom-option" value="biały">
                    biały
                  </Option>
                  <Option className="custom-option" value="niebieski">
                    niebieski
                  </Option>
                  <Option className="custom-option" value="szary">
                    szary
                  </Option>
                  <Option className="custom-option" value="czerwony">
                    czerwony
                  </Option>
                  <Option className="custom-option" value="granatowy">
                    granatowy
                  </Option>
                  <Option className="custom-option" value="" />
                </Select>
              </Form.Item>
              <Form.Item name="from" label="Data rozpoczęcia wypożyczenia (od dnia)">
                <DatePicker
                  format="YYYY-MM-DD"
                  locale={{
                    ...locale,
                    lang: {
                      ...locale.lang,
                      now: "Czas",
                      ok: "Zatwierdź",
                    },
                  }}
                />
              </Form.Item>
              <Form.Item name="to" label="Data zakończenia wypożyczenia (do dnia)">
                <DatePicker
                  format="YYYY-MM-DD"
                  locale={{
                    ...locale,
                    lang: {
                      ...locale.lang,
                      now: "Czas",
                      ok: "Zatwierdź",
                    },
                  }}
                />
              </Form.Item>
              <button className="btn btn-sm" type="sumbit">
                Szukaj
              </button>
              <button
                onClick={() => {
                  form.resetFields();
                  getHistory();
                }}
                className="btn btn-sm"
                type="button"
              >
                Wyczyść filtr
              </button>
            </Form>
          </Card>

          <div className="history-content">
            <Table
              columns={historyColumns}
              dataSource={displayHistory}
              pagination={false}
            />
            <Pagination
              current={page}
              pageSize={pageSize}
              total={history.length}
              onChange={onPageChange}
            />
          </div>
        </SharedLayout>
      </Wrapper>
    </MainWrapper>
  );
};

export default History;
