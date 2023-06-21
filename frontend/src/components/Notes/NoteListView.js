import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    BsPencilSquare
} from 'react-icons/bs'

export default function NoteListView({ note }) {
    const navigate = useNavigate();
    function handleClickOpen() {
        console.log(note._id)
        navigate(`/edit/${note._id}`)
    }

    let lastModified = new Date(note.lastModified);
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    
    let month = months[lastModified.getMonth()]
    let date = lastModified.getDate();
    if (date < 10) date = '0' + date
    
    let hours = lastModified.getHours();
    if (hours < 10) hours = '0' + hours

    let minutes = lastModified.getMinutes();
    if (minutes < 10) minutes = '0' + minutes

    let year = lastModified.getFullYear();


    let current_Date = new Date();
    let currentDate = current_Date.getDate();
    let currentYear = current_Date.getFullYear();

    let showMonth = currentYear > year
        ?
        true
        :
        current_Date.getMonth() > lastModified.getMonth()
            ?
            true
            :
            currentDate > date
                ?
                true
                :
                false;
    let showYear = currentYear > year;

    return (
        <div
            onClick={handleClickOpen}
            className='
            group
            relative
            bg-white
            border border-1 
            rounded-md 
            p-3 
            shadow-sm
            hover:shadow-md
            duration-200
            cursor-pointer
            '>
            <div className='hidden absolute top-0 right-0 border translate-x-[40%] -translate-y-[40%] group-hover:block duration-200 bg-black rounded-full text-white p-2'>
                <BsPencilSquare />
            </div>
            <div className='p-3 flex flex-row w-full items-center justify-between'>
                <div className='flex flex-row w-[95%] md:w-[87%] sm:w-[80%] '>
                    <h2 className='font-semibold pr-2 w-[120px] sm:w-[100px] truncate' >
                        {
                            note.title === ""
                                ?
                                <div className='italic text-gray-500'>Untitled</div>
                                :
                                note.title
                        }
                    </h2>
                    <div className='text-gray-700 mx-2  truncate'>
                        {note.noteBody}
                    </div>
                </div>
                <div
                    className=' text-gray-400 text-sm border-l-2 pl-1 whitespace-nowrap '
                >
                    {showMonth ? `${month} ${date}${showYear ? `, ${year}` : ''}` : `${hours} : ${minutes}`}
                </div>
            </div>
        </div>
    )
}
