import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  useToggleLoginContext,
  useUpdateUserDetails
} from '../ApplicationContext';
import axiosCalls from '../../helper/axiosCalls';
import validators from '../../helper/validators';
import customToasts from '../../helper/customToasters';
import Button from '../utils/Button'
import InputField from '../utils/InputField';

export default function Login() {
  const toggleLogin = useToggleLoginContext();
  const updateUserDetails = useUpdateUserDetails();
  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogginIn, setIsLogginIn] = useState(false)
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  // click login
  const handleSubmit = () => {
    if (!validators.validateLoginForm({ email, password })) {
      return;
    };
    setIsLogginIn(true)
    axiosCalls.loginUser({ email, password })
      .then(data => {
        setIsLogginIn(false)
        console.log(data)
        localStorage.setItem("jwtToken", data.jwtToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.jwtToken}`;
        updateUserDetails({
          email: data.userDetails.email,
          userId: data.userDetails.userId
        })
        toggleLogin();
        customToasts.resolve("Success")
        navigate("/")
      })
      .catch(err => {
        setIsLogginIn(false)
        if (err.response?.status === 400) {
          customToasts.error("Invalid Credencials")
        }
        customToasts.error("Some error Occured")
        console.log(err)
      })
  }
  return (
    <div className='w-full flex justify-center items-center  flex-col'>
      <div className="w-[550px] md:w-[400px] bg-white shadow-sm sm:w-full mt-20 flex flex-col items-center border ">
        <div className=' w-full flex'>
          <h2 className='text-2xl font-bold py-8  text-center mx-auto'>
            Login to Yellow Pages
          </h2>
        </div>
        <form className='space-y-6 w-3/4'>
          <div>
            <InputField
              disabled={isLogginIn}
              value={email}
              onChange={e => setEmail(e.target.value.trim())}
              placeholder='Email'
            />
          </div>
          <div className='relative'> 
            <div
              onClick={() => { setShowPass(prev => !prev) }}
              className='
                      absolute 
                      right-0 
                      mx-2 
                      py-1
                      px-2
                      rounded-md
                      text-center 
                      text-sm 
                      translate-y-[50%] 
                      cursor-pointer
                      text-gray-700
                      bg-gray-200
                      hover:bg-gray-300
                      duration-200
                      select-none
                      '
            >
              {showPass ? "Hide" : "Show"}
            </div>
            <InputField
              disabled={isLogginIn}
              value={password}
              onChange={e => setPassword(e.target.value.trim())}
              placeholder='Password'
              type={showPass ? "text" : "password"}
            />
            <div
              className='
                        w-full 
                        text-right 
                        text-sm
                        text-gray-600
                        hover:text-gray-900
                        hover:drop-shadow-md
                        cursor-pointer
                        pt-2
                        '
            >
              <Link
                to='/reset'
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              disabled={isLogginIn}
              isLoading={isLogginIn}
              loadingText="Logging in"
              theme="dark"
              onClick={handleSubmit}
              className='
                        w-full
                        mb-4
                        '
              type='submit'
            >Login</Button>

            <div className='w-full 
                            text-center 
                            text-sm
                            text-gray-600
                            pb-3
                             '>
              Not a member?{" "}<Link
                to="/register"
                className='
                          cursor-pointer 
                          hover:text-blue-900
                          hover:drop-shadow-md
                          text-blue-600
                          '
              >
                Register
              </Link>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}
