import styled from "styled-components";

const Wrapper = styled.main`
  .content {
    background-color: #0072b5;
    width: 100%;
    height: 185vh;
    border-radius: 5px;
    box-shadow: 0 0 2px gray;
  }

  .page-title {
    padding-top: 50px;
    padding-left: 30px;
    float: left;
  }

  .listOfCars {
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

  .filter {
    clear: both;
    margin-left: 10px;
    margin-right: 10px;
    width: auto;
    position: inline-block;
    background-color: var(--dark);
    height: auto;
  }

  .ant-input {
    margin-bottom: 16px;
  }

  .slider-hourlyPrice {
    width: 150px;
  }

  .select-color {
    width: 110px;
  }

  .select-bodyType {
    width: 110px;
  }

  .select-gearboxType {
    width: 140px;
  }

  .select-fuelType {
    width: 100px;
  }

  .select-capacity {
    width: 50px;
    margin-right: 10px;
  }

  .btn {
    margin-top: 16px;
    margin-left: 20px;
  }

  .form-item-fuelType {
    margin-top: 16px;
  }

  .form-item-capacity {
    margin-top: 16px;
  }
`;

export default Wrapper;
