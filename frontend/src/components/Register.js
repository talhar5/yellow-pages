import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosCalls from '../helper/axiosCalls';
import validators from '../helper/validators';
import customToasts from '../helper/customToasters';
import { useUpdateUserDetails } from './ApplicationContext'
import Button from './utils/Button'
import InputField from './utils/InputField';


export default function Register() {
  // states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const updateUserDetails = useUpdateUserDetails();

  const handleSubmit = (event) => {
    console.log(event)
    if (!validators.validateRegistrationForm({ name, email, password })) {
      return;
    };
    customToasts.pending("Registering");
    updateUserDetails({ email, password, name })
    axiosCalls.registerUser({ email, password, name })
      .then(data => {
        customToasts.resolve("Success")
        console.log(data)
        navigate("/otp")
      })
      .catch(err => {
        console.log(err.response?.status)
        if (err.response?.status === 409) {
          customToasts.reject("Email already Registered")
        }
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
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Name'
              className=''
            />
          </div>
          <div>
            <InputField
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Email'
            />
          </div>
          <div>
            <InputField
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Password'
              type='password'
            />
          </div>
          <div>
            <Button
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
