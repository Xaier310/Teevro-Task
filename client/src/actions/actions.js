export const fileLoadData = (data) =>{
 return{
     type : "CHANGE_FILE_CONTENT",
     data: data 
 }
}

export const fileRemoveData = () =>{
    return{
        type : "REMOVE_FILE_CONTENT",
    }
   }

export const fileUploadedOrNot = (data) =>{
   return{
       type: "TOGGLE_ISFILEUPLOADED",
       data: data
   }
}

export const transactionRejectList = (data) =>{
    return{
        type: "TRANSACTION_LIST_REJECT",
        transactionId: data
    }
 }

 export const transactionAcceptList = (data) =>{
    return{
        type: "TRANSACTION_LIST_ACCEPT",
        transactionId: data
    }
 }

 export const allTransactionsFromDBFn = (data) =>{
    return {
    type:"ALLTRANSACTION_FROM_DB",
    data:data
    }
 }

 export const fetchAllTransactions = (data) =>{
     return {
     type:"FETCH_TRANSACTIONS",
     data:data
    }
 }

 export const isLoadingFn = (data) =>{
     return{
         type:"IS_LOADING",
         data:data
     }
 }

 export const setSummaryDetail = (data)=>{
     return{
        type:"SET_SUMMARY_DETAIL",
        data:data
     }
 }

 export const setUser = (user) =>{
     return{
       type:"LOGIN_OR_REGISTER",
       user:user
     }
 }

 export const removeUser = () =>{
    return{
       type:"LOGOUT"
    }
}

export const activeNavComp = (data) =>{
    return{
        type: "ACTIVE_NAV_COMP",
        data:data
    }
}

export const removeTracList = ()=>{
    return{
        type:"REMOVE_TRANSACTION_LIST"
    }
}