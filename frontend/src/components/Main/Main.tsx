import { AppShell, Navbar, Header, Text } from '@mantine/core';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// import Assignments from '../Assignments/Assignments';
// import Attandence from '../Attandence/Attandence';
import HomeNavbar from '../HomeNavbar/HomeNavbar';
import Login from '../Login/Login';
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
      {/* Your application here */}
      <Routes>
        {/* <Route path="/" element={<Navigate to="hr" />} /> */}
        <Route
          path="hr"
          element={
            <Text align="center" fz={40} fw={600}>
              HR Round Questions
            </Text>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="profile" element={<Profile />} />
        <Route path="/" element={<NoticeBoard />} />
        <Route path="attendence" element={<Attandence />} />
        <Route path="assignments" element={<Assignments />} /> */}
      </Routes>
    </AppShell>
  );
};
export default Home;
