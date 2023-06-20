import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosCalls from '../../helper/axiosCalls';
import customToasts from '../../helper/customToasters';
import { useUserDetails } from '../ApplicationContext';
import validators from '../../helper/validators';
import InputField from '../utils/InputField';
import TButton from '../utils/Button';


export default function CreatePassword() {
    // states
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const navigate = useNavigate();
    const userDetails = useUserDetails();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validators.validateCreatePasswordForm({ password, repeatPassword })) {
            return
        }
        customToasts.pending("Verifying");

        axiosCalls.createPassword({ email: userDetails.email, password })
            .then(data => {
                customToasts.resolve("New password created")
                navigate("/login")
            })
            .catch(err => {
                if (err.response.status === 400) {
                    customToasts.reject("Invalid OTP")
                } else if (err.response.status === 500) {
                    customToasts.reject("Internal Server Error")
                } else if (err.response.status === 426) {
                    customToasts.reject("Please verify your email first")
                } else {
                    customToasts.reject("Some Error occured")
                }
            })
    }
    return (
        <div className='w-full flex justify-center items-center  flex-col'>
            <div className="w-[550px] md:w-[400px] py-6 bg-white shadow-sm sm:w-full mt-20 flex flex-col items-center border ">
                <div className='w-full flex'>
                    <h2 className='text-2xl font-bold text-center mx-auto'>
                        Create New Password
                    </h2>
                </div>
                <form className='space-y-4 w-3/4 mt-4'>
                    <div>
                        <InputField
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='New Password'
                            type='password'
                            className=''
                        />
                    </div>
                    <div>
                        <InputField
                            value={repeatPassword}
                            onChange={e => setRepeatPassword(e.target.value)}
                            placeholder='Repeat New Password'
                            type='password'
                            className=''
                        />
                    </div>
                    <div>
                        <TButton
                            theme="dark"
                            onClick={handleSubmit}
                            className='
                                        w-full
                                        '
                            type='submit'
                        >Create Password</TButton>
                    </div>
                </form>
            </div>
        </div>
    )
}
