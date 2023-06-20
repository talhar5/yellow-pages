import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosCalls from '../helper/axiosCalls';
import customToasts from '../helper/customToasters';
import { useUserDetails } from './ApplicationContext';
import InputField from './utils/InputField';
import Button from './utils/Button';


export default function Otp() {
    const [otp, setOtp] = useState('');
    const [isVerifying, setIsVerifying] = useState(false)
    const navigate = useNavigate();
    const userDetails = useUserDetails();

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsVerifying(true)
        axiosCalls.verifyOtp({ email: userDetails.email, otp })
            .then(data => {
                setIsVerifying(false)
                console.log(data)
                navigate("/login")
            })
            .catch(err => {
                setIsVerifying(false)
                console.log(err.response.status)
                if (err.response.status === 400) {
                    customToasts.error("Invalid OTP")
                } else if (err.response.status === 500) {
                    customToasts.error("Internal Server Error")
                }else {
                    customToasts.error("Some error has occured")
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
                            disabled={isVerifying}
                            theme="light"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            placeholder='OTP'
                            maxLength={6}
                        />
                    </div>
                    <div>
                        <Button
                            disabled={isVerifying}
                            isLoading={isVerifying}
                            loadingText="Verifying"
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
