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
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';
import BookDetail from './pages/BookDetail';
import FirstPage from './pages/First';
import { Modals } from './components/modal/Modals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FirstPage />,
    errorElement: <Error />,
  },
  {
    path: '/',
    element: (
      <Wrapper>
        <Layout />
      </Wrapper>
    ),
    children: [
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
      {
        path: '/auth/changepassword',
        element: <ChangePassword />,
      },
      {
        path: '/book/:bookId',
        element: <BookDetail />,
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
    ],
  },
  {
    path: '/first',
    element: <FirstPage />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
        <Modals />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default App;
