import styled from "styled-components";

const Wrapper = styled.main`
  main {
    padding: 20px;
    h1 {
      padding-top: 15px;
      font-size: 3.75rem;
      float: left;
      font-weight: bold;
      text-align: center;
      font-family: var(--bodyFont);
    }
  }

  nav {
    background-color: #0072b5;
    border-color: #005093;
    border-style: solid;
    border-width: thick;
    border-radius: 10px;
    box-shadow: 0 0 2px gray;
    margin-bottom: 20px;
    height: 15vh;
    width: 100%;
    color: gold;
  }

  .sidebar {
    background-color: #0072b5;
    border-radius: 5px;
    box-shadow: 0 0 2px gray;
    margin-right: 20px;
    height: 135vh;
    width: 380px;
    padding: 10px;
  }

  .sidebar-header {
    h1 {
      display: block;
      text-align: center;
      color: gold;
      align-items: center;
    }
  }

  .content {
    background-color: #0072b5;
    width: 100%;
    height: 140vh;
    border-radius: 5px;
    box-shadow: 0 0 2px gray;
  }

  .menu {
    margin-top: 100px;
    padding: 0 10px;
  }

  .menu-item {
    margin-top: 40px;
  }

  .menu-item a {
    color: rgba(255, 255, 255, 0.727);
    text-decoration: none;
    font-size: 30px;
    padding: 0 10px;
  }
  .menu-item i {
    color: rgba(255, 255, 255, 0.716);
    text-decoration: none;
    font-size: 18px;
    margin: 0 15px;
  }

  .active-menu-item {
    padding: 10px;
    background-color: #005093;
    border-radius: 10px;
    color: white;
  }

  .switch-dark-theme {
    float: right;
    padding-right: 40px;
    display: block;
  }

  .Account-role {
    float: left;
    color: gold;
    font-weight: 900;
    font-size: 26px;
    padding-left: 40px;
    display: block;
  }

  .nickname {
    float: right;
    color: gold;
    font-weight: 900;
    font-size: 26px;
    padding-right: 40px;
    display: block;
  }

  .switch-theme-title {
    font-weight: 900;
  }

  .avatar {
    float: right;
    padding-right: 40px;
    padding-top: 20px;
    display: block;
  }

  .avatar-icon:hover {
    box-shadow: var(--shadow-3);
    background: var(--primary-900);
  }

@media (max-width: 768px) {
  nav {
    flex: 0 0 100%;
  }

  .sidebar {
    flex: 0 0 100%;
  }
}

`;

export default Wrapper;
