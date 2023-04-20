import styled from "styled-components";

const Wrapper = styled.main`
  .content {
    background-color: #0072b5;
    width: 100%;
    height: 140vh;
    border-radius: 5px;
    box-shadow: 0 0 2px gray;
  }

  .page-title {
    padding-top: 50px;
    padding-left: 30px;
  }

  .ant-table {
    font-size: 12px;
    padding-top: 10px;
    background-color: #005093;
    max-height: 90vh;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .ant-table-thead > tr > th {
    background-color: #005093;
    color: gold;
    position: sticky;
  }

  .filter {
    clear: both;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
    width: auto;
    position: inline-block;
    background-color: var(--dark);
    height: auto;
  }

  .ant-input {
    margin-bottom: 16px;
  }

  .userId-input {
    width: 210px;
  }

  .select-color {
    width: 110px;
  }

  .btn {
    margin-top: 10px;
    margin-left: 20px;
  }

  .ant-pagination {
    padding-top: 50px;
    padding-left: 10px;
  }
`;

export default Wrapper;
