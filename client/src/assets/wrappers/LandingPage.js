import styled from "styled-components";

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-800);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }

  .nav-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
    .nav-img {
      display: inline-flex;
      width: 50px;
      height: 50px;
    }

    footer {
      p {
        color: var(--black);
        text-align: center;
        display: inline-block;
      }
    }
  }
`;
export default Wrapper;
