import React, { useState, useRef } from 'react';
import axiosCalls from '../../helper/axiosCalls';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical, BsArrowLeft, BsCheck2 } from "react-icons/bs";
import customToasts from '../../helper/customToasters';
import { Spinner } from '@chakra-ui/react'

export default function CreateNewNote() {
    // states
    const [noteBody, setNoteBody] = useState('');
    const [title, setTitle] = useState('');
    const [noteDate, setNoteDate] = useState(new Date())
    const [isTyping, setIsTyping] = useState(false);
    const [isManuActive, setIdManuActive] = useState(false);
    const [noteId, setNoteId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);


    const navigate = useNavigate();
    const previousData = useRef({
        title: "",
        noteBody: ""
    });

    function deleteNote() {
        axiosCalls.deleteNote({ noteId })
            .then(data => {
                customToasts.success("Deleted")
                console.log(data)
            })
            .catch(err => {
                customToasts.error("Couldn't delete")
                console.log(err)
            })
    }
    function createNote() {
        setIsSaving(true)
        axiosCalls.createNote({ title, noteBody })
            .then(data => {
                setNoteId(data._id);
                console.log(data);
                setIsSaving(false)
            })
            .catch(err => {
                setIsSaving(false)
                console.log(err)
            })

    }
    function updateNote() {
        setIsSaving(true)
        axiosCalls.updateNote({ noteId, title, noteBody })
            .then(data => {
                setIsSaving(false)
                console.log(data)
            })
            .catch(err => {
                setIsSaving(false)
                console.log(err)
            })
    }

    const handleOnFocusInput = () => {
        setIsTyping(true);
    }

    function handleClickSave() {
        if (noteId === null) {
            createNote();
            setIsTyping(false)
        } else {
            updateNote();
            setIsTyping(false)
        }
        previousData.current.noteBody = noteBody;
        previousData.current.title = title;

    }


    function handleClickBack() {
        if (previousData.current.noteBody === noteBody && previousData.current.title === title) {
            navigate("/");
            return;
        }
        navigate("/");
        handleClickSave();
    }

    function handleClickDelete() {
        if (!isTyping && noteId) {
            deleteNote()
        }
        navigate("/")
    }
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }

    let month = months[noteDate.getMonth()]
    let date = noteDate.getDate();
    if (date < 10) date = '0' + date

    let hours = noteDate.getHours();
    if (hours < 10) hours = '0' + hours

    let minutes = noteDate.getMinutes();
    if (minutes < 10) minutes = '0' + minutes

    let year = noteDate.getFullYear();

    let current_Date = new Date();
    let currentYear = current_Date.getFullYear();
    let isOlderThanAYear = currentYear > year;

    // let currentMonth = months[current_Date.getMonth()]
    // let currentDate = current_Date.getDate();
    // let currentHours = current_Date.getHours();
    // let currentMinutes = current_Date.getMinutes();

    return (
        <div className='w-full flex justify-center items-center mt-3 flex-col  '>
            <div className="w-[550px] md:w-[400px] sm:w-full rounded-md flex flex-col items-center border shadow-sm bg-white">
                <div className='w-full  flex flex-row justify-between border-b items-center'>
                    <div className=''>
                        <BsArrowLeft className="h-full w-full p-3 text-2xl cursor-pointer" onClick={handleClickBack} />
                    </div>
                    <h2 className='text-md text-gray-600 font-semibold text-center '>
                        Create New Note
                    </h2>
                    {isSaving
                        ?
                        <div className=' translate-y-[2px] mr-3'>
                            <Spinner size="xl" speed='1s' className=' p-3' />
                        </div>
                        :
                        <div>

                            {isTyping && (noteBody.length !== 0 || title.length !== 0)
                                ?
                                <div className="" onClick={handleClickSave}>
                                    <BsCheck2 className='h-full w-full text-2xl p-3 cursor-pointer' />
                                </div>
                                :
                                <div>
                                    <BsThreeDotsVertical
                                        className='relative h-full w-full p-3  text-2xl cursor-pointer'
                                        onClick={() => setIdManuActive(prev => !prev)}
                                    />
                                    {isManuActive
                                        &&
                                        <ul
                                            className='
                                    translate-y-2
                                    absolute
                                    bg-white
                                    shadow-md
                                    '
                                        >
                                            <li
                                                className='p-2 cursor-pointer'
                                                onClick={handleClickDelete}
                                            >
                                                Delete
                                            </li>
                                        </ul>
                                    }
                                </div>
                            }
                        </div>}

                </div>
                <div className='w-full px-10 '>
                    <div className='w-full '>
                        <input
                            placeholder='Title'
                            onFocus={handleOnFocusInput}
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className='
                                font-semibold
                                text-lg
                                p-3
                                rounded-md
                                w-full
                                focus:outline-none'
                        />
                        <div className='text-gray-400 text-sm pl-3'>
                            <span>{month} {date}{isOlderThanAYear && `, ${year}`} &nbsp; {hours}:{minutes}</span> | <span>{countCharacters(noteBody)}</span>
                            {countCharacters(noteBody) > 1 ? ' characters' : " character"}
                        </div>
                        <div className='mt-5'>
                            <textarea
                                onChange={(e) => setNoteBody(e.target.value)}
                                onFocus={handleOnFocusInput}
                                value={noteBody}
                                rows={15}
                                className='
                                p-3
                                pt-1
                                w-full
                                focus:border-none
                                focus:outline-none
                                resize-none
                                '
                                autoFocus
                                placeholder='Start typing...'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



function countCharacters(text) {
    let text_ = text.replace(/\s+/g, ' ')
    return text_.length;
}