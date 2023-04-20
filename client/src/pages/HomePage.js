import React from 'react'
import { useSelector } from "react-redux";
import SharedLayout from '../components/SharedLayout';
import Wrapper from '../assets/wrappers/SharedLayout';
import { UsersList } from './admin';
import Main from '../components/Main';

const HomePage = () => {

  const { user } = useSelector((state) => state.user);

  const Content = user?.isAdmin ? UsersList : Main;

  return (
    <Wrapper>
    <SharedLayout children={Content}>
      <Content/>
    </SharedLayout>
    </Wrapper>
  )
}

export default HomePage