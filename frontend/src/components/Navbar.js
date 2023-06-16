import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Image } from '@chakra-ui/react'
import {
    useLoginContext,
    useToggleLoginContext,
    useUpdateUserDetails,
} from './ApplicationContext'



export default function Navbar() {

    const isLogin = useLoginContext();
    const toggleLogin = useToggleLoginContext();
    const updateUserDetails = useUpdateUserDetails();
    const navigate = useNavigate();
    function handleClickLogout() {
        localStorage.setItem("jwtToken", "");
        toggleLogin()
        updateUserDetails({ email: "", name: "" });
        navigate("/login")
    }
    return (
        <>
            <div
                className='
                    bg-white
                    w-full
                    border-b
                    border-[#eaeaea]
                    flex
                    flex-row
                    justify-between
                   '>
                <ul>
                    <li className='p-4 ml-3'>
                        <Link
                            to="/"
                            className="
                            text-gray-800 
                            font-semibold
                            text-2xl
                            flex 
                            flex-row 
                            items-center 
                            space-x-3
                          ">
                            <Image src='https://img.icons8.com/pastel-glyph/64/note.png' boxSize="30px" />
                            <div className='sm:text-base'>
                                Yellow Pages
                            </div>
                        </Link>
                    </li>
                </ul>
                <ul className='flex flex-row items-center px-4 sm:px-1'>
                    {isLogin ? <>
                        <li className='m-2'>
                            <Link to="/login" className='btn' onClick={handleClickLogout}>
                                Logout
                            </Link>
                        </li>
                    </> :
                        <>
                            <li className='m-2'>
                                <Link to="/register" className='btn'>
                                    Sign up
                                </Link>
                            </li>
                            <li className='m-2'>
                                <Link to="/Login" className='btn'>
                                    Login
                                </Link>
                            </li>
                        </>}
                </ul>
            </div>
            <div className='container-fluid'>
                <Outlet />
            </div>
        </>
    )
}
