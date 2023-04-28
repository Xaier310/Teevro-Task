import { configureStore } from "@reduxjs/toolkit";
import fileSlice from "../slice/fileSlice";
import userSlice from "../slice/userSlice";
import transactionSlice from "../slice/transactionSlice";
import otherSlice from "../slice/otherSlice"
import summarySlice from "../slice/summarySlice"
 
const store =configureStore({
    reducer:{
        file: fileSlice,
        user: userSlice,
        transaction: transactionSlice,
        other: otherSlice,
        summary: summarySlice
    },
});

export default store;