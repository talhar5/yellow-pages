import React, { useEffect, useState } from 'react'
import Note from './Note';
import axiosCalls from '../../helper/axiosCalls.js';
import {
    useToggleLoginContext,
    useLoginContext,
    useUserDetails
} from '../ApplicationContext'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { addNote } from './notesSlice';

export default function NotesList() {
    const navigate = useNavigate();
    const toggleLogin = useToggleLoginContext();
    const isLogin = useLoginContext();
    const userDetails = useUserDetails();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        if (!isLogin) return;
        axiosCalls.getAllNotes({ userId: userDetails.userId })
            .then(data => {
                console.log(data)
                let notes_ = [...data];
                notes_.reverse();
                setNotes(notes_)
            })
            .catch(err => {
                console.log(err.response?.status)
                if (err.response?.status === 401) {
                    localStorage.setItem("jwtToken", "")
                    toggleLogin();
                    navigate("/login")
                }
            })
    }, [])
    return (
        <div className=''>
            <div className='grid gap-14  sm:gap-8 sm:grid-cols-1 grid-cols-3 md:grid-cols-2 '>
                {notes.map(note => <Note key={note._id} note={note} />)}
            </div>
        </div>
    )
}
