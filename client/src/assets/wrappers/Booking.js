import styled from "styled-components";

const Wrapper = styled.main`
  .content {
    background-color: #0072b5;
    width: 100%;
    height: 120vh;
    border-radius: 5px;
    box-shadow: 0 0 2px gray;
  }

  .page-title {
    padding-top: 50px;
    padding-left: 30px;
  }

  .payment-div {
    clear: both;
    padding-top: 20px;
    padding-left: 60px;
  }

  .offer-info {
    padding-top: 20px;
    float: left;
  }

  .details {
    float: right;
    padding-left: 100px;
  }

  .rangePicker {
    margin-top: 20px;
  }

  .checkbox-isDriver {
    margin-top: 20px;
  }

  .totalPrice {
    margin-top: 70px;
  }

  .stripe-checkout-button {
    padding-top: 40px;
    clear: both;
  }

  .order-button {
    padding-top: 40px;
    clear: both;
  }
`;

export default Wrapper;
