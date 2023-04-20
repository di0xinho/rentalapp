import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Table,
  Modal,
  Pagination,
  Button,
  Card,
  Form,
  Select,
  Input,
} from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import MainWrapper from "../../assets/wrappers/SharedLayout";
import Wrapper from "../../assets/wrappers/UsersList";
import moment from "moment";

const UsersList = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState();
  const [record, setRecord] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [page, setPage] = useState(1);
  const pageSize = 7;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayUsers = users.slice(startIndex, endIndex);

  const { Option } = Select;
  const [form] = Form.useForm();

  const UserListColumns = [
    {
      title: "Login",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Data utworzenia konta",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD-MM-YYYY HH:mm:ss"),
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
    },
    {
      title: "Akcje",
      dataIndex: "",
      key: "actions",
      render: (_, record) => (
        <Button type="link" danger onClick={() => handleShowModal(record)}>
          Usuń
        </Button>
      ),
    },
  ];

  const handleShowModal = (record) => {
    setRecord(record);
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  function handleKeyPress(event) {
    if (event.key === " ") {
      event.preventDefault();
    }
  }

  const deleteUser = async () => {
    try {
      if (userId === record["_id"]) {
        toast.error("Nie możesz usunąć własnego konta");
      } else {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/admin/delete-user",
          {
            record,
            userId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        setIsModalVisible(false);

        if (response.data.success) {
          toast.success("Usuwanie użytkownika zakończyło się powodzeniem");
        } else {
          toast.error("Usuwanie użytkownika zakończyło się niepowodzeniem");
        }
      }
    } catch (error) {
      dispatch(hideLoading);
    }
  };

  const getUsersData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

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

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/search-for-users",
        { values },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success("Zwrócono listę użytkowników");
        setUsers(response.data.data);
        setPage(1);
      } else {
        toast.error("Nie udało się wyszukać samochodów");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Błąd podczas wyszukiwania użytkowników");
    }
  };

  useEffect(() => {
    getUsersData();
    getUserId();
  }, []);

  return (
    <>
      <MainWrapper>
        <Wrapper>
          <h1 className="page-title">Lista zarejestrowanych użytkowników</h1>
          <hr />

          <Card className="filter">
            <Form form={form} layout="inline" onFinish={onFinish}>
              <Form.Item name="name" label="Login">
                <Input placeholder="Wpisz login użytkownika" />
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input
                  className="email-input"
                  placeholder="Wpisz adres email użytkownika"
                />
              </Form.Item>
              <Form.Item name="firstName" label="Imię">
                <Input placeholder="Wpisz imię użytkownika" />
              </Form.Item>
              <Form.Item name="surname" label="Nazwisko">
                <Input
                  className="surname-input"
                  placeholder="Wpisz nazwisko użytkownika"
                />
              </Form.Item>
              <Form.Item label="Numer telefonu" name="phoneNumber">
                <Input
                  className="input-phoneNumber"
                  onKeyPress={handleKeyPress}
                  placeholder="Wprowadź numer telefonu"
                />
              </Form.Item>
              <Form.Item name="isAdmin" label="Status konta">
                <Select className="select-isAdmin">
                  <Option value={true}>Administrator</Option>
                  <Option value={false}>Użytkownik</Option>
                  <Option value="" />
                </Select>
              </Form.Item>
              <button className="btn btn-sm" type="sumbit">
                Szukaj
              </button>
              <button
                onClick={() => {
                  form.resetFields();
                }}
                className="btn btn-sm"
                type="button"
              >
                Wyczyść filtr
              </button>
            </Form>
          </Card>

          <Table
            columns={UserListColumns}
            dataSource={displayUsers}
            pagination={false}
          />
          <Modal
            open={isModalVisible}
            onCancel={handleCancelModal}
            onOk={deleteUser}
            title="Czy na pewno chcesz usunąć tego użytkownika?"
            okText="Zatwierdź"
            cancelText="Anuluj"
          >
            <p>Ta operacja jest nieodwracalna.</p>
          </Modal>
          <hr />

          <Pagination
            current={page}
            pageSize={pageSize}
            total={users.length}
            onChange={onPageChange}
          />
        </Wrapper>
      </MainWrapper>
    </>
  );
};

export default UsersList;
