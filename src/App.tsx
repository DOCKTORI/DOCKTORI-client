// src/App.tsx
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme'; // 테마 파일 경로
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import { GlobalStyle } from './style/global';
import Error from './components/common/Error';
import Wrapper from './components/layout/Wrapper';
import Layout from './components/layout/Layout';
import AuthLayout from './components/layout/AuthLayout/AuthLayout';
import Favorite from './pages/Favorite';
import ChangePassword from './pages/ChangePassword';
import ReadingBooks from './pages/ReadingBooks';
import ReadedBooks from './pages/ReadedBooks';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Wrapper>
        <Layout />
      </Wrapper>
    ),
    errorElement: (
      <Wrapper>
        <Error />
      </Wrapper>
    ),
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/main',
        element: <Main />,
      },
      {
        path: '/favorite',
        element: <Favorite />,
      },

      {
        path: '/readingbooks',
        element: <ReadingBooks />,
      },
      {
        path: '/readedbooks',
        element: <ReadedBooks />,
      },
    ],
  },
  {
    path: '/auth',
    element: (
      <Wrapper>
        <AuthLayout />
      </Wrapper>
    ),
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/signup',
        element: <Signup />,
      },
      {
        path: '/auth/changepassword',
        element: <ChangePassword />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
export default App;
