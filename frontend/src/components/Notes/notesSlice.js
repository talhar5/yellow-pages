import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notes: []
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.notes.unshift(action.payload);
        },
    }
})


export const { addNote } = notesSlice.actions;  

export default notesSlice.reducer;