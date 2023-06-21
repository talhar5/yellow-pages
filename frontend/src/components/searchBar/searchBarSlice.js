import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    searchQuery: '',
    notesCardType: 'grid'
}

export const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState,
    reducers: {
        changeCardType: (state, action) => {
            state.notesCardType = action.payload
        },
        changeSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        }
    }
})



export default searchBarSlice.reducer;
export const { changeCardType, changeSearchQuery } = searchBarSlice.actions;