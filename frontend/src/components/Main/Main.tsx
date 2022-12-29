import { AppShell, Navbar, Header, Text } from '@mantine/core';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Profile from '../Profile/Profile';
import HomeNavbar from '../HomeNavbar/HomeNavbar';
import QuestionPanel from '../QuestionPanel/QuestionPanel';
import Login from '../Login/Login';
import QuestionContent from '../QuestionContent/QuestionContent';
import Register from '../Register/Register';
import { useContext, useEffect } from 'react';
import AuthContext from '../../store/auth-context';

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/hr');
    }
  }, [isLoggedIn]);
  return (
    <AppShell
      navbar={<HomeNavbar />}
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
