import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosCalls from '../helper/axiosCalls';
import customToasts from '../helper/customToasters';
import { useUserDetails } from './ApplicationContext';
import InputField from './utils/InputField';
import Button from './utils/Button';


export default function Otp() {
    // states
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const userDetails = useUserDetails();

    const handleSubmit = (e) => {
        e.preventDefault()

        customToasts.pending("Verifying");

        axiosCalls.verifyOtp({ email: userDetails.email, otp })
            .then(data => {
                customToasts.resolve("Email verified")
                console.log(data)
                navigate("/login")
            })
            .catch(err => {
                console.log(err.response.status)
                if (err.response.status === 400) {
                    customToasts.reject("Invalid OTP")
                } else if (err.response.status === 500) {
                    customToasts.reject("Internal Server Error")
                }
                console.log(err)
            })
    }
    return (
        <div className='w-full flex justify-center items-center  flex-col'>
            <div className="w-[550px] md:w-[400px] bg-white shadow-sm sm:w-full mt-20 flex flex-col items-center border ">
                <div className=' w-full flex'>

                    <h2 className='text-2xl font-bold pt-6 pb-2  text-center mx-auto'>
                        Verify your Email
                    </h2>
                </div>
                <form className='space-y-6 w-3/4 mt-4'>
                    <div>
                        <div
                            className='text-gray-500 text-sm text-center mb-5'
                        >
                            An OTP has been sent to your email address. Please check your inbox/spam folder and enter the OTP in the field below.
                        </div>
                        <InputField
                            theme="light"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            placeholder='OTP'
                            maxLength={6}
                        />
                    </div>
                    <div>
                        <Button
                            theme="dark"
                            onClick={handleSubmit}
                            className='
                                    w-full 
                                    mb-4
                                    '
                            type='submit'
                        >Verify</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
