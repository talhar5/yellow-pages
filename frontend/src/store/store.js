import { configureStore } from '@reduxjs/toolkit'
import notesReducer from '../components/Notes/notesSlice'

export const store = configureStore({
    reducer: {
        notes: notesReducer,
    }
})