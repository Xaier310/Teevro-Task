import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loading } from "./otherSlice";
import { setSummary } from "./summarySlice";

const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        transacList: [],
        allTransactionsFromDB: []
    },
    reducers: {
        rejectList: (state, action) => {
            var pos = state.transacList.map(e => e.tracId).indexOf(action.payload);
            if (!(pos >= 0))
                state.transacList.push({
                    status: "rejected",
                    tracId: action.payload
                });
        },
        acceptList: (state, action) => {
            var pos = state.transacList.map(e => e.tracId).indexOf(action.payload);
            if (!(pos >= 0))
                state.transacList.push({
                    status: "accepted",
                    tracId: action.payload
                });
        },
        allTransactionList: (state, action) => {
            state.allTransactionsFromDB = action.payload;
        },
        removeTransactionList: (state, action) => {
            state.transacList = [];
        }
    },

});


export const {
    rejectList,
    acceptList,
    allTransactionList,
    removeTransactionList
} = transactionSlice.actions;

export default transactionSlice.reducer;


// API CALL
export const fetchTransactions = () => {
    return async function fetchTransactionsThunk(dispatch, getState) {
        try {
            dispatch(loading(true));
            const { user } = getState().user;
            if (!user) return; 
            const alltrans = await axios.get(`${process.env.REACT_APP_Backend_API}/db/transaction-record`, { params: { username: user?.email } });
            if (!alltrans?.data)  return; 
            alltrans?.data?.sort((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
            dispatch(allTransactionList(alltrans?.data));
            var tempSummaryDetail = {
                totalAmount: 0,
                totalNetAmount: 0,
                totalRewards: 0,
                acceptedTransCount: 0,
                transCount: 0
            }
            alltrans?.data?.forEach((val, index) => {
                tempSummaryDetail.transCount++;
                if (val.status === "accepted") {
                    tempSummaryDetail.acceptedTransCount++;
                    tempSummaryDetail.totalAmount += val.amount;
                    tempSummaryDetail.totalRewards += val.reward;
                    tempSummaryDetail.totalNetAmount += val.netAmount;
                }
            })
            dispatch(setSummary(tempSummaryDetail));
        } catch (err) {
            console.log(err);
        }finally{
            dispatch(loading(false));
        }
    }
}

