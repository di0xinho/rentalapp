import styled from "styled-components";

const Wrapper = styled.main`
  
  .content {
    background-color: #0072b5;
    width: 100%;
    height: 260vh;
    border-radius: 5px;
    box-shadow: 0 0 2px gray;
  }

  .page-title {
    padding-top: 50px;
    padding-left: 30px;
  }

  .card-car-info {
    clear: both;
    margin-left: 10px;
    margin-right: 10px;
    width: auto;
    height: 228vh;
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

  .adding-car-content {
  }

  .auto-image {
    float: left;
    height: 300px;
    width: 300px;
  }

  .image-car {
    border: 3px solid black;
    height: 300px;
    width: 300px;
  }

  .btn {
    margin-top: 20px;
  }

  .new-car-form {
    width: 60%;
    float: left;
    margin-left: 40px;
    margin-right: 10px;
  }
`;

export default Wrapper;
