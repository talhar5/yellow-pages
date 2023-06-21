import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Image } from '@chakra-ui/react'
import { changeLoginStatus, addUserDetails } from './login/userSlice'
import { useDispatch, useSelector } from 'react-redux'



export default function Navbar() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const navigate = useNavigate();
    function handleClickLogout() {
        localStorage.setItem("jwtToken", "");
        dispatch(changeLoginStatus(false))
        dispatch(addUserDetails({ email: '', fullname: '' }))
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
                    sticky
                    top-0
                    z-10
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
                    {isLoggedIn ? <>
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
