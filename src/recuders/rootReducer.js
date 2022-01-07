import { combineReducers } from "redux";
import {basicfn, transactionListfn, summaryDetailFn, getUserFn} from "./recuders"

const rootReducer = combineReducers({
    basicfn,
    transactionListfn,
    summaryDetailFn,
    getUserFn
});

export default rootReducer;