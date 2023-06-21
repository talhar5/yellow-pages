import {
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
    BsListUl,
    BsGrid,
    BsSearch,
    BsPlus
} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeCardType, changeSearchQuery } from './searchBarSlice';

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
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cardType = useSelector(state => state.searchBar.notesCardType)
    const [isGridActive, setIsGridActive] = useState(() => {
        if (cardType === 'grid') {
            return true;
        } else {
            return false
        }
    })

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

    function handleClickGrid() {
        setIsGridActive(true)
        dispatch(changeCardType('grid'))
    }
    function handleClickList() {
        setIsGridActive(false)
        dispatch(changeCardType('list'))
    }
    function handleChangeSearch(e) {
        setSearchQuery(e.target.value)
        dispatch(changeSearchQuery(e.target.value))
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
                <InputGroup className='w-full h-full' >
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
                        onChange={handleChangeSearch}
                        value={searchQuery}
                        className='w-full rounded-md h-full ml-10 pl-3 text-gray-700 focus:outline-none'
                        placeholder='Search...'
                    />
                </InputGroup>
            </div>
            <div className=' flex flex-row items-center justify-evenly bg-white border border-[#eaeaea] rounded-md '>
                <div className='p-1'>
                    <div
                        onClick={handleClickGrid}
                        className={`p-2 
                        text-gray-800
                        rounded-sm 
                        duration-500 
                        ${isGridActive
                                ?
                                "bg-gray-200"
                                :
                                "cursor-pointer hover:bg-gray-100"}`}
                    >
                        <BsGrid />
                    </div>
                </div>
                <div
                    onClick={handleClickList}
                    className={`p-2
                    text-gray-800
                    mr-1 
                    rounded-sm 
                    duration-500 
                    ${!isGridActive
                            ?
                            "bg-gray-200"
                            :
                            "cursor-pointer hover:bg-gray-100"}`}
                >
                    <BsListUl />
                </div>
            </div>
            <div
                onClick={handleClickCreateNote}
                className='px-6 md:px-5 sm:px-3 bg-gray-950 text-white rounded-md flex items-center justify-center hover:bg-[#383838] duration-200 cursor-pointer whitespace-nowrap'>
                {
                    screenType === "mobile"
                        ?
                        <div className='text-2xl'>
                            <BsPlus />
                        </div>
                        :
                        screenType === "desktop"
                            ?
                            "Add New Note"
                            :
                            "Add New"

                }
            </div>
        </div >
    )
}
