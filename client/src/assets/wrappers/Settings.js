import styled from "styled-components";

const Wrapper = styled.main`
  .content {
    background-color: #0072b5;
    width: 100%;
    height: 180vh;
    border-radius: 5px;
    box-shadow: 0 0 2px gray;
  }

  .page-title {
    padding-top: 50px;
    padding-left: 30px;
  }

  .edit-profile {
    padding-left: 20px;
    clear: both;
    max-width: 50%;
  }

  .blocked-input {
    cursor: not-allowed;
    background-color: white;
    color: black;
  }

  .ant-descriptions {
    background-color: white;
    border-radius: 10px;
  }

  .btn {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .switch {
    margin-left: 30px;
  }
`;

export default Wrapper;
