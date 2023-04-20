import styled from "styled-components";

const Wrapper = styled.main`
  .content {
    background-color: #0072b5;
    width: 100%;
    height: 135vh;
    border-radius: 5px;
    box-shadow: 0 0 2px gray;
  }

  .page-title {
    padding-top: 50px;
    padding-left: 30px;
  }

  .ant-descriptions {
    padding: 10px;
  }

  .lackOfData-info {
    color: #8b0000;
    text-align: justify;
    padding-top: 30px;
    padding-left: 30px;
  }
`;

export default Wrapper;
