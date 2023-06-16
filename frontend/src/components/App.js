import CreateNewNote from './CreateNewNote';
import Edit from "./Edit"
import Login from './Login'
import Register from './Register'
import Error404 from './404'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from './ApplicationContext'
import Navbar from './Navbar'
import Otp from './Otp';
import ResetPassword from './ResetPassword';
import ResetPassOtp from './ResetPassOtp';
import CreatePassword from './CreatePassword'
import Home from './Home';


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
    <ContextProvider>
      <ToastContainer
        autoClose={2000}
        position='top-center'
        theme='light'
        hideProgressBar={true}
        newestOnTop={false}
        transition={Slide}
      />
      <RouterProvider router={router} />
    </ContextProvider>
  )
}
