import { createSlice } from "@reduxjs/toolkit";


const computeInitialState = () => {
    if (localStorage.getItem('jwtToken') && localStorage.getItem('jwtToken') !== '') {
        return true;
    } else {
        return false
    }
}

const initialState = {
    isLoggedIn: computeInitialState(),
    test: "yes working",
    userDetails: {
        fullName: '',
        email: '',
        userId: '',
        displayPicture: ''
    }

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeLoginStatus: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        addUserDetails: (state, action) => {
            state.userDetails = { ...state.userDetails, ...action.payload }
        }

    }
})


export const { changeLoginStatus, addUserDetails } = userSlice.actions;
export default userSlice.reducer;