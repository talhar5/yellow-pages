import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosCalls from '../../helper/axiosCalls';
import customToasts from '../../helper/customToasters';
import { useSelector } from 'react-redux';
import InputField from '../utils/InputField';
import TButton from '../utils/Button';

export default function ResetPassOtp() {
    // states
    const [otp, setOtp] = useState('');
    const [isLoading, setIsloading] = useState(false)
    const navigate = useNavigate();
    const userDetails = useSelector(state => state.user.userDetails);

    // click login
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsloading(true)

        customToasts.pending("Verifying otp")
        axiosCalls.verifyOtp({ email: userDetails.email, otp })
            .then(data => {
                console.log(data)
                setIsloading(false)
                customToasts.resolve("success")
                navigate("/create-password")
            })
            .catch(error => {
                console.log(error)
                setIsloading(false)
                let err = error.response
                if (err?.status === 400) {
                    return customToasts.reject("Invalid OTP")
                }
                if (err?.status === 500) {
                    return customToasts.reject(err.message)
                }
                if (err?.status === 404) {
                    return customToasts.reject(err.message)
                }
                return customToasts.reject(err.message)
            })


    }
    return (
        <div className='w-full flex justify-center items-center flex-col'>
            <div className="w-[550px] md:w-[400px] py-8 bg-white shadow-sm sm:w-full mt-20 flex flex-col items-center border  ">
                <div className='w-full flex'>
                    <h2 className='text-2xl font-bold   text-center mx-auto'>
                        Verify OTP
                    </h2>
                </div>
                <form className='space-y-4 w-3/4'>
                    <div>
                        <div
                            className='text-gray-500 text-sm text-center my-4'
                        >
                            An OTP has been sent to your email address. Please check your inbox/spam folder and enter the OTP in the field below.
                        </div>
                        <InputField
                            value={otp}
                            disabled={isLoading}
                            onChange={e => setOtp(e.target.value)}
                            placeholder='OTP'
                            maxLength={6}
                            className=''
                        />
                    </div>
                    <div>
                        <TButton
                            theme="dark"
                            isLoading={isLoading}
                            loadingText="verifying"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className='w-full'
                            type='submit'
                        >Verify OTP</TButton>

                    </div>

                </form>
            </div>
        </div>
    )
}
