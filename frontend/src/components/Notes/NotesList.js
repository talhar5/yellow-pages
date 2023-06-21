import React, { useEffect } from 'react'
import Note from './Note';
import NoteListView from './NoteListView';
import axiosCalls from '../../helper/axiosCalls.js';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { addAllNote, } from './notesSlice';
import { changeLoginStatus } from '../login/userSlice';

export default function NotesList() {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const userDetails = useSelector(state => state.user.userDetails);
    const notes = useSelector(state => state.notes.notes)
    const searchQuery = useSelector(state => state.searchBar.searchQuery);
    const notesCardType = useSelector(state => state.searchBar.notesCardType)
    const dispatch = useDispatch();


    useEffect(() => {
        if (!isLoggedIn) return;
        axiosCalls.getAllNotes({ userId: userDetails.userId })
            .then(data => {
                let notes_ = [...data];
                notes_.reverse();
                dispatch(addAllNote(notes_))
            })
            .catch(err => {
                console.log(err.response?.status)
                if (err.response?.status === 401) {
                    localStorage.setItem("jwtToken", "")
                    dispatch(changeLoginStatus(false))
                    navigate("/login")
                }
            })
    }, [])


    let filteredNotes = notes.filter(item => {
        if ((item.title.toLowerCase()).includes(searchQuery.toLowerCase()) || (item.noteBody.toLowerCase()).includes(searchQuery.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    })

    return (
        <div className=''>
            <div
                className={`
                grid 
                 
                
                ${notesCardType === 'grid'
                        ?
                        "sm:grid-cols-1 grid-cols-3 md:grid-cols-2 gap-14 sm:gap-8 "
                        :
                        "grid-cols-1 gap-6 sm:gap-4"}`
                }>
                {filteredNotes.map(note => {
                    if (notesCardType === 'grid') {
                        return <Note key={note._id} note={note} />
                    } else {
                        return <NoteListView key={note._id} note={note} />
                    }
                })}
            </div>
        </div >
    )
}
