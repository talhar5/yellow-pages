import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosCalls from '../../helper/axiosCalls';
import validators from '../../helper/validators';
import customToasts from '../../helper/customToasters';
import { addUserDetails } from '../login/userSlice';
import { useDispatch } from 'react-redux';
import InputField from '../utils/InputField';
import Button from '../utils/Button';

export default function ResetPassword() {
  // states
  const [email, setEmail] = useState('');
  const [isLoading, setIsloading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // click login
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsloading(true)
    if (!validators.validateEmail(email)) {
      setIsloading(false)
      return;
    };
    dispatch(addUserDetails({ email, password: "", fullName: "" }))
    customToasts.pending("Sending OTP to your Email")
    console.log(email)
    axiosCalls.resetPassword({ email })
      .then(data => {
        setIsloading(false)
        customToasts.resolve("OTP sent")
        navigate("/verify-otp")
      })
      .catch(error => {
        let err = error?.response
        setIsloading(false)
        console.log(err)
        if (err?.status === 400) {
          customToasts.reject(err.message)
        }
        else if (err?.status === 500) {
          customToasts.reject(err.message)
        }
        else if (err?.status === 404) {
          return customToasts.reject("Email is not registered")
        }
        customToasts.reject(err.message)

      })


  }
  return (
    <div className='w-full flex justify-center items-center  flex-col'>
      <div className="w-[550px] md:w-[400px] bg-white shadow-sm sm:w-full mt-20 flex flex-col items-center border py-6">
        <div className='w-full flex'>
          <h2 className='text-2xl font-bold mb-4 text-center mx-auto'>
            Reset Password
          </h2>
        </div>
        <form className='space-y-5 w-3/4'>
          <div>
            <InputField
              value={email}
              disabled={isLoading}
              onChange={e => setEmail(e.target.value)}
              placeholder='Email'

            />
          </div>
          <div>
            <Button
              theme="dark"
              isLoading={isLoading}
              loadingText="verifying"
              onClick={handleSubmit}
              disabled={isLoading}
              type='submit'
              className="w-full"
            >
              Verify Email
            </Button>

          </div>

        </form>
      </div>
    </div>
  )
}
