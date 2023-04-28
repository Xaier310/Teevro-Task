import { createSlice } from "@reduxjs/toolkit";

const otherSlice = createSlice({
    name: 'other',
    initialState: {
        isLoading: true,
        isHomeActive: true
    },
    reducers: {
        activeNavComp: (state, action) => {
            state.isHomeActive = action.payload;
        },
        loading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
});

export const { loading, activeNavComp } = otherSlice.actions;
export default otherSlice.reducer;