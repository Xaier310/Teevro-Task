import { createSlice } from "@reduxjs/toolkit";

const summarySlice = createSlice({
    name: 'other',
    initialState: {
        totalAmount: 0,
        totalNetAmount: 0,
        totalRewards: 0,
        acceptedTransCount: 0,
        transCount: 0
    },
    reducers: {
        setSummary: (state, action) => {
            return action.payload;
        },
    },

});

export const { setSummary } = summarySlice.actions;
export default summarySlice.reducer;