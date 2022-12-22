import { AppShell, Navbar, Header, Text } from '@mantine/core';
// import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Profile from '../Profile/Profile';
// import Assignments from '../Assignments/Assignments';
// import Attandence from '../Attandence/Attandence';
import HomeNavbar from '../HomeNavbar/HomeNavbar';
import QuestionPanel from '../QuestionPanel/QuestionPanel';
import Login from '../Login/Login';
import QuestionContent from '../QuestionContent/QuestionContent';
import Register from '../Register/Register';
// import MainHeader from '../MainHeader/MainHeader';
// import NoticeBoard from '../NoticeBoard/NoticeBoard';
// import Profile from '../Profile/Profile';

const Home = () => {
  return (
    <AppShell
      // padding="md"
      navbar={<HomeNavbar />}
      //   header={<MainHeader />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Routes>
        <Route path="/:type" element={<QuestionPanel />} />
        <Route path="/:type/:queId" element={<QuestionContent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AppShell>
  );
};
export default Home;
