import { Navigate, Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';
import Login from './components/Login/Login';
import Switch from 'react-switch';
import clsx from 'clsx';
import './App.css';

export const ThemeContext = createContext(null);

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
      <div className={clsx('main')} id={theme === 'light' ? 'light' : 'dark'}>
        <div className="switch">
          <Switch
            onChange={toggleTheme}
            checked={theme === 'dark'}
            onColor="#6f039c"
            offColor="#8e44ad"
            handleDiameter={20}
            uncheckedIcon={false}
            checkedIcon={false}
          />
        </div>
        <Login />
        <p className="tagline">"Opportunities don't happen, you create them."</p>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
