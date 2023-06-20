import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    BsPencilSquare
} from 'react-icons/bs'

export default function Note({ note }) {
    const navigate = useNavigate();
    function handleClickOpen() {
        console.log(note._id)
        navigate(`/edit/${note._id}`)
    }
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
            <div className='p-3 flex flex-col content-between h-full'>
                <div>

                    <h2 className='font-semibold truncate border-b mb-2'>
                        {
                            note.title === ""
                                ?
                                <div className='italic text-gray-500'>Untitled</div>
                                :
                                note.title
                        }
                    </h2>
                    <div className='text-gray-700 line-clamp-5'>
                        {note.noteBody}
                    </div>
                </div>
                <div
                    className=' text-gray-400 mt-3 text-sm '
                >
                    4 : 15 pm
                </div>
            </div>
        </div>
    )
}
