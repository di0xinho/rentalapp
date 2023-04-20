import styled from "styled-components";

const Wrapper = styled.main`
  .page-title {
    padding-top: 30px;
  }

  Table {
    padding-top: 20px;
    background-color: #005093;
    max-height: 90vh;
  }

  .ant-table-thead > tr > th {
    background-color: #005093;
    color: gold;
    position: sticky;
  }

  .filter {
    clear: both;
    margin-left: 2px;
    margin-right: 2px;
    margin-bottom: 20px;
    width: auto;
    position: inline-block;
    background-color: var(--dark);
    height: auto;
  }

  .ant-input {
    margin-bottom: 16px;
  }

  .btn {
    margin-top: 10px;
    margin-left: 9px;
  }

  .select-isAdmin {
    width: 130px;
  }

  .surname-input {
    width: 202px;
  }

  .email-input {
    width: 220px;
  }

  .input-phoneNumber {
    display: inline-block;
    width: 190px;
  }
`;

export default Wrapper;
