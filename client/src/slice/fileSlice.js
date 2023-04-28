import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
    name:'file',
    initialState: {
        isFileUploaded: false,
        fileData: [],
        isLoading: false,
        isHomeActive: true
    },

    reducers: {
        changeFile: (state,action) => {
            state.fileData = action.payload;
        },
        removeFile: (state, action) => {
            state.fileData = [];
        },
        toggleIsFileUploaded: (state, action) => {
            state.isFileUploaded = action.payload;
        },
    }
});

export const { changeFile, removeFile, toggleIsFileUploaded } = fileSlice.actions;
export default fileSlice.reducer;