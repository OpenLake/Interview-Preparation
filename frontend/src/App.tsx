import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Main from './components/Main/Main';
import AuthProvider from './store/AuthProvider';
import { ColorSchemeProvider, MantineProvider, ColorScheme } from '@mantine/core';
const App = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<Main />} />
          </Routes>
        </AuthProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
