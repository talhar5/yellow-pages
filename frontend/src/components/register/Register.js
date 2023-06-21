import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosCalls from '../../helper/axiosCalls';
import validators from '../../helper/validators';
import customToasts from '../../helper/customToasters';
import { addUserDetails } from '../login/userSlice';
import { useDispatch } from 'react-redux';
import Button from '../utils/Button'
import InputField from '../utils/InputField';
import PasswordGuide from './PasswordGuide';


export default function Register() {
  // states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isPasswordTyping, setIsPasswordTyping] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);
  const [isSigningup, setIsSigningup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    if (!validators.validateRegistrationForm({ name, email, password, repeatPassword })) {
      return;
    };
    setIsSigningup(true);
    dispatch(addUserDetails({ email, password, fullName: name }))
    axiosCalls.registerUser({ email, password, name })
      .then(data => {
        setIsSigningup(false);
        console.log(data)
        navigate("/otp")
      })
      .catch(err => {
        setIsSigningup(false);
        console.log(err.response?.status)
        if (err.response?.status === 409) {
          customToasts.error("Email already Registered")
          return;
        }
        customToasts.error("Some error has occured")
        console.log(err)
      })
  }
  return (
    <div className='w-full flex justify-center items-center  flex-col'>
      <div className="w-[550px] md:w-[400px] bg-white shadow-sm sm:w-full mt-20 flex flex-col items-center border">
        <div className=' w-full flex'>
          <h2 className='text-2xl font-bold pt-6 pb-2  text-center mx-auto'>
            Register to Yellow Pages
          </h2>
        </div>
        <form className='space-y-6 w-3/4 mt-4'>
          <div>
            <InputField
              disabled={isSigningup}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Name'
              className=''
            />
          </div>
          <div>
            <InputField
              disabled={isSigningup}
              value={email}
              onChange={e => setEmail(e.target.value.trim())}
              placeholder='Email'
            />
          </div>
          <div >
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
                      -translate-y-[50%] 
                      top-[50%]
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
                disabled={isSigningup}
                onFocus={() => setIsPasswordTyping(true)}
                onBlur={() => setIsPasswordTyping(false)}
                value={password}
                onChange={e => setPassword(e.target.value.trim())}
                placeholder='Password'
                type={showPass ? "text" : "password"}
              />
            </div>
            <PasswordGuide className="" password={password} isPasswordTyping={isPasswordTyping} />
          </div>
          <div className='relative'>
            <div
              onClick={() => { setShowRepeatPass(prev => !prev) }}
              className='
                      absolute 
                      right-0 
                      mx-2 
                      py-1
                      px-2
                      rounded-md
                      text-center 
                      text-sm 
                      -translate-y-[50%] 
                      top-[50%]
                      cursor-pointer
                      text-gray-700
                      bg-gray-200
                      hover:bg-gray-300
                      duration-200
                      select-none
                      '
            >
              {showRepeatPass ? "Hide" : "Show"}
            </div>
            <InputField
              disabled={isSigningup}
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value.trim())}
              placeholder='Repeat Password'
              type={showRepeatPass ? "text" : "password"}
            />
          </div>
          <div>
            <Button
              disabled={isSigningup}
              isLoading={isSigningup}
              loadingText="Logging in"
              theme="dark"
              onClick={handleSubmit}
              className='
                w-full
                  text-white
                  px-3
                  py-2  
                  rounded-md
                  font-semibold
                  mb-4
                '
              type='submit'
            >Register</Button>
            <div className='w-full 
                            text-center 
                            text-sm
                            text-gray-600
                            pb-4
                             '>
              Already have an account?{" "}<Link
                to="/login"
                className='
                          cursor-pointer 
                          hover:text-blue-900
                          hover:drop-shadow-md
                          
                          text-blue-600'
              >Login</Link>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}
