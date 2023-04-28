const initialState = {
    isFileUploaded: false,
    fileData: [],
    isLoading: false,
    isHomeActive: true
}

const initialStateOfTransaction = {
    transacList: [],
    allTransactionsFromDB: []
}

const initialTransactionSummaryDetail = {
    totalAmount: 0,
    totalNetAmount: 0,
    totalRewards: 0,
    acceptedTransCount: 0,
    transCount: 0
}

const initialUser = null;

export const basicfn = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_FILE_CONTENT": return { ...state, fileData: action.data };
        case "TOGGLE_ISFILEUPLOADED": return { ...state, isFileUploaded: action.data };
        case "REMOVE_FILE_CONTENT": return { ...state, fileData: [] };
        case "IS_LOADING": return { ...state, isLoading: action.data };
        case "ACTIVE_NAV_COMP": return { ...state, isHomeActive: action.data };
        default: return state;
    }
}

export const transactionListfn = (state = initialStateOfTransaction, action) => {
    switch (action.type) {
        case "TRANSACTION_LIST_ACCEPT":
            var pos = state.transacList.map(e => e.tracId).indexOf(action.transactionId);
            if (!(pos >= 0))
                state.transacList.push({
                    status: "accepted",
                    tracId: action.transactionId
                });
            return state;
        case "TRANSACTION_LIST_REJECT":
            pos = state.transacList.map(e => e.tracId).indexOf(action.transactionId);
            if (!(pos >= 0))
                state.transacList.push({
                    status: "rejected",
                    tracId: action.transactionId
                });
            return state;

        case "REMOVE_TRANSACTION_LIST":
            return { ...state, transacList: [] };

        case "ALLTRANSACTION_FROM_DB":
            return { ...state, allTransactionsFromDB: action.data };
        default: return state;
    }
}

export const summaryDetailFn = (state = initialTransactionSummaryDetail, action) => {
    switch (action.type) {
        case "SET_SUMMARY_DETAIL":
            return action.data;
        default: return state;
    }
}


export const getUserFn = (state = initialUser, action) => {
    switch (action.type) {
        case "LOGIN_OR_REGISTER":
            return action.user;
        case "LOGOUT":
            return null;
        default: return state;
    }
} 