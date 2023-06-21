import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notes: []
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addAllNote: (state, action) => {
            state.notes = action.payload;
        }
    }
})


export const { addAllNote } = notesSlice.actions;

export default notesSlice.reducer;