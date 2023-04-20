import styled from "styled-components";

const Wrapper = styled.main`
  .Authentication {
    height: 150vh;
    align-items: center;
    display: flex;
    justify-content: center;
    h1 {
      padding-top: 15px;
      font-size: 3.75rem;
      float: left;
      font-weight: bold;
      text-align: center;
      font-family: var(--bodyFont);
    }
  }

  .card {
    border-radius: 0 !important;
    box-shadow: 0 0 2px gray;
    width: 470px;
  }

  .Authentication-form {
    background-color: rgb(27, 160, 171);
  }

  input {
    border: 1px solid rgb(27, 160, 171) !important;
    border-radius: 2.5px !important;
    height: 45px !important;
  }

  input:focus {
    border: 1px solid rgb(27, 160, 171) !important;
    outline: none !important;
    box-shadow: none !important;
  }

  label {
    font-size: 18px !important;
    color: black !important;
  }

  .ant-form-item {
    margin: 15px 0 !important;
  }

  .btn {
    display: table;
    margin: 0 auto;
    font-size: 1.5rem;
  }

  .btn-hero {
    display: table;
    margin: 0 auto;
    font-size: 1.5rem;
  }

  .string {
    font-size: 18px;
    color: black;
    text-align: center;
  }

  .string:hover {
    color: #111111 !important;
    text-decoration: underline !important;
  }

  .login-title {
    text-align: center;
  }
`;

export default Wrapper;
