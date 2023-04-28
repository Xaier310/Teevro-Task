import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions } from "../slice/transactionSlice";
import Loading from "./Loading"
import SummaryTable from "./summaryTable";


const Summary = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.other);
  const { user } = useSelector((state) => state.user);

  useEffect(()=>{
    dispatch(fetchTransactions());
  },[user]);

  return (
    <>
      {isLoading ? <Loading/> : <SummaryTable />}
    </>
  );
}

export default Summary;