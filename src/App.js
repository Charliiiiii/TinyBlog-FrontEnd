import React from 'react';
import { Button } from 'antd';
import Home from "./pages/home/index.js";
import Navbar from './components/navbar/index.jsx';
import './App.css';
import CreateHome from './pages/createHome/index.js';
import WriteArticle from './pages/writeArticle/index.jsx';

import {
  createBrowserRouter,
  Outlet,
  RouterProvider
} from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: [{
    path: '/',
    element: <Home />
  }, {
    path: '/createCenter',
    element: <CreateHome />
  }, {
    path: '/writeArticle',
    element: <WriteArticle />
  }]
}])


const App = () => (
  <div className="App">
    <RouterProvider router={router} />
  </div>
);

export default App;