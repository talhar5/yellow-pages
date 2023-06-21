import CreateNewNote from './Notes/CreateNewNote';
import Edit from "./Notes/Edit"
import Login from './login/Login'
import Register from './register/Register'
import Error404 from './404/404'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from './Navbar'
import Otp from './register/Otp';
import ResetPassword from './forgotPassword/ResetPassword';
import ResetPassOtp from './forgotPassword/ResetPassOtp';
import CreatePassword from './forgotPassword/CreatePassword'
import Home from './home/Home';


export default function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/otp",
          element: <Otp />
        },
        {
          path: "/reset",
          element: <ResetPassword />
        },
        {
          path: "/verify-otp",
          element: <ResetPassOtp />
        },
        {
          path: "/create-password",
          element: <CreatePassword />
        },
        {
          path: "/create",
          element: <CreateNewNote />
        },
        {
          path: "/edit/:noteId",
          element: <Edit />
        },
        {
          path: "*",
          element: <Error404 />
        },
      ]
    },

  ])
  return (
    <>
      <ToastContainer
        autoClose={2000}
        position='top-center'
        theme='light'
        hideProgressBar={true}
        newestOnTop={false}
        transition={Slide}
      />
      <RouterProvider router={router} />
    </>
  )
}
