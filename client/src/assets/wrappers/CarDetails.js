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
  }

  .auto-content {
    clear: both;
    padding-top: 20px;
  }

  .card-car-info {
    clear: both;
    margin-left: 10px;
    margin-right: 10px;
    width: auto;
    height: auto;
    position: inline-block;
  }

  .card-car-info .ant-card-head-title {
    text-align: center;
    font-size: 42px;
    color: gold;
    font-weight: bold;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .auto-image {
    float: left;
    border: 3px solid black;
  }

  .auto-info {
    clear: both;
    padding-top: 40px;
    padding-right: 10px;
    padding-left: 10px;
    width: 100%;
    text-align: center;
  }

  .auto-info .ant-descriptions-title {
    text-align: center;
    font-size: 32px;
  }

  .auto-info .ant-descriptions-item-label {
    text-align: center;
  }

  .btn {
    float: left;
    margin-left: 90px;
    margin-top: 20px;
  }

  .payment {
    float: left;
    margin-top: 40px;
    margin-left: 45px;
    cursor: pointer;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
    text-align: center;

    h5 {
      font-size: 15px;
      color: #fffdd0;
      font-weight: bold;
      margin-top: 10px;
      margin-left: 5px;
      margin-right: 5px;
    }
  }

  .payment:hover {
    background-color: #266f76;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in-out;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0;
    transition: opacity 500ms ease-in-out;
  }
`;

export default Wrapper;
