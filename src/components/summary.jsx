import React from "react";
import Navbar from "./navbar";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import { allTransactionsFromDBFn, setSummaryDetail, isLoadingFn } from "../actions/actions";
import { useEffect } from "react";
import Loading from "./Loading"


const Summary = ()=>{
  const dispatch = useDispatch();
  const myState = useSelector((state)=>state.transactionListfn);
  const myState2 = useSelector((state)=>state.basicfn);
  const myState3 = useSelector((state)=>state.summaryDetailFn);
  const user = useSelector((state)=>state.getUserFn);


  const setAllTransaction = async ()=>{
    dispatch(isLoadingFn(true));
    const alltrans = await axios.get("https://teevro-task-server.herokuapp.com/db/transaction-record",{params:{username:user?.email}});
    dispatch(isLoadingFn(false));
    if(alltrans){
      alltrans.data.sort((a,b)=>{
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      
      dispatch(allTransactionsFromDBFn(alltrans.data));

      var tempSummaryDetail = {
        totalAmount:0,
        totalNetAmount:0,
        totalRewards:0,
        acceptedTransCount:0,
        transCount:0
    }
      alltrans.data.forEach((val,index)=>{
          tempSummaryDetail.transCount++;
          if(val.status === "accepted"){
             tempSummaryDetail.acceptedTransCount++;
             tempSummaryDetail.totalAmount += val.amount;
             tempSummaryDetail.totalRewards += val.reward;
             tempSummaryDetail.totalNetAmount += val.netAmount;
            }
      })
      dispatch(setSummaryDetail(tempSummaryDetail));
    }
    }
    
    console.log("load0: ", myState2.isLoading);

  useEffect(()=>{
    setAllTransaction();
  },[]);



return(
<>
{myState2.isLoading ? <Loading />:
<>
<Navbar />
    <table className="table">
  <thead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">Date</th>
      <th scope="col">Transaction Id</th>
      <th scope="col">Amount</th>
      <th scope="col">Reward</th>
      <th scope="col">Net Amount</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>

    {/* {!myState2.isLoading ? */}
    {/* <> */}
    {myState && myState.allTransactionsFromDB && myState.allTransactionsFromDB.map((val, index)=>{
    return(<>
    <tr key={index}>
      <th scope="row">{index+1}</th>
      <td>{val.date}</td>
      <td>{val.transactionId}</td>
      <td>{val.amount}</td>
      {/* <td>{val.reward}</td> */}
      {/* <td>{val.netAmount}</td> */}
      {val.status==="accepted"?<td>{val.reward}</td>:<td>-</td>}
      {val.status==="accepted"?<td>{val.netAmount}</td>:<td>-</td>}
      {val.status==="accepted"?<td id="acceptStamp">Accepted</td>:<td id="rejectStamp">Rejected</td>}
    </tr>
    </>);
    })}
    {/* </>:<Loading /> */}
    {/* } */}
  </tbody>
</table>
  <div id="summary-box">
    <h3>Summary : </h3>
  <table className="table table-striped table-dark">
  <tbody>
    <tr>
      <th scope="row">Total Transaction</th>
      <td>{myState3.transCount}</td>
    </tr>
    <tr>
      <th scope="row">Total Transaction with Reward</th>
      <td>{myState3.acceptedTransCount}</td>
    </tr>
    <tr>
      <th scope="row">Total Amount</th>
      <td>{myState3.totalAmount}</td>
    </tr>
    <tr>
      <th scope="row">Total Reward</th>
      <td>{myState3.totalRewards}</td>
    </tr>
    <tr>
      <th scope="row">Total Net Amount</th>
      <td>{myState3.totalNetAmount}</td>
    </tr>
  </tbody>
</table>
  </div>
</>
}
  </>
);
}

export default Summary;