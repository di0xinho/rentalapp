import styled from "styled-components";

const Wrapper = styled.main`
  .content {
    background-color: #0072b5;
    width: 100%;
    height: 170vh;
    border-radius: 5px;
    box-shadow: 0 0 2px gray;
  }

  .page-title {
    padding-top: 50px;
    padding-left: 30px;
    float: left;
  }

  .listOfFavoriteCars {
    clear: both;
  }

  .car-card {
    width: 300px;
    height: 300px;
    padding: 20px;
  }

  .ant-pagination {
    padding-top: 50px;
    padding-left: 10px;
  }

  .ant-list {
    padding-top: 20px;
  }

  .ant-list-item {
    width: 100%;
  }

  .car-info {
    float: left;
    color: black;
  }

  .favorite {
    color: #dc143c;
    cursor: pointer;
    float: right;
    padding-right: 10px;
  }

  .btn {
    margin-top: 16px;
    margin-left: 20px;
  }
`;

export default Wrapper;
