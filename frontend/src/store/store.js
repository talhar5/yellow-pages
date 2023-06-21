import { configureStore } from '@reduxjs/toolkit'
import notesReducer from '../components/Notes/notesSlice'
import userReducer from '../components/login/userSlice'
import searchBarReducer from '../components/searchBar/searchBarSlice'

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        user: userReducer,
        searchBar: searchBarReducer
    }
})
