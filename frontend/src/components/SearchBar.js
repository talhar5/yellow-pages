import {
    Input,
    InputGroup,
    InputLeftElement,
    Spinner
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
    BsListUl,
    BsGrid,
    BsSearch,
    BsPlus
} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [isInputActive, setIsInputActive] = useState(false);
    const [screenType, setScreenType] = useState(() => {
        if (window.innerWidth <= 480) {
            return "mobile";
        }
        else if (window.innerWidth > 480 && window.innerWidth <= 768) {
            return "tablet"
        }
        else if (window.innerWidth > 768) {
            return "desktop"
        }
    });
    const navigate = useNavigate();

    function handleClickCreateNote() {
        navigate("/create")
    }
    // to get screen width
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    function handleResize() {
        if (window.innerWidth <= 480) {
            setScreenType("mobile")
        }
        else if (window.innerWidth <= 768) {
            setScreenType("tablet")
        }
        else {
            setScreenType("desktop")
        }
    }

    return (
        <div
            className='
            w-full 
            my-6
            flex
            gap-x-2
            '
        >
            <div className={`flex-grow border  rounded-md bg-white ${isInputActive ? 'border-[#666666]' : 'border-[#eaeaea]'}`} >
                <InputGroup className='w-full  h-full' >
                    <InputLeftElement
                        pointerEvents='none'
                        className='relative'
                    >
                        <div className='h-full pl-10 pt-5 my-auto absolute text-gray-500'>
                            <BsSearch className='text-xl' />
                        </div>
                    </InputLeftElement>
                    <Input
                        onFocus={() => setIsInputActive(true)}
                        onBlur={() => setIsInputActive(false)}
                        className='w-full rounded-md h-full ml-10 pl-3 text-gray-700 focus:outline-none'
                        placeholder='Search...'
                    />
                </InputGroup>
            </div>
            <div className=' flex flex-row items-center justify-evenly bg-white border border-[#eaeaea] rounded-md '>
                <div className='p-1'>
                    <div className='bg-gray-200 p-2 rounded-sm'>
                        <BsGrid />
                    </div>
                </div>
                <div className='p-3'>
                    <BsListUl />
                </div>
            </div>
            <div
                onClick={handleClickCreateNote}
                className='px-6 md:px-5 sm:px-3 bg-gray-950 text-white rounded-md flex items-center justify-center hover:bg-[#383838] duration-200 cursor-pointer'>
                {
                    screenType === "mobile"
                        ?
                        <div className='text-2xl'>
                            <BsPlus />
                        </div>
                        :
                        "Add New Note"
                }
            </div>
        </div >
    )
}
