import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import { transactionAcceptList, transactionRejectList, fileUploadedOrNot, fileRemoveData, isLoadingFn, activeNavComp, removeTracList } from "../actions/actions";
import axios from "axios";

const Overlay = () =>{
    const dispatch = useDispatch();
    const myState = useSelector((state)=>state.transactionListfn);
    const myState2 = useSelector((state)=>state.basicfn);
    const user = useSelector((state)=>state.getUserFn);
    const navigate = useNavigate();

    const handleOnAccept = (e, tracId) =>{
        e.preventDefault();
        dispatch(transactionAcceptList(tracId));
        let ele = document.getElementById(`${tracId}`);
        if(ele){
            ele.innerHTML = `<h5 id="acceptStamp">Accepted</h5>`;
            // count++;
            // if(count >= 2){
            //   let done_btn = document.getElementById("done");
            //   if(done_btn){
            //     done_btn.removeAttribute("disabled");
            //   }
            // }
        }
    }
    
    const handleOnReject = (e,tracId) =>{
        e.preventDefault();
        dispatch(transactionRejectList(tracId));
        let ele = document.getElementById(`${tracId}`);
      if(ele){
            ele.innerHTML = `<h5 id="rejectStamp">Rejected</h5>`
        // count++;
        // if(myState2 && myState2.fileData && count >= myState2.fileData.length-1){
        //   let done_btn = document.getElementById("done");
        //   if(done_btn){
        //     done_btn.removeAttribute("disabled");
        //   }
        // }
      }
    }

    const handleOnDone =async (e) =>{
      e.preventDefault();
      var permanantTrac=[];
      var tracList = myState.transacList;
      var fileData = myState2.fileData;

      for(let i=1; tracList && fileData && i<fileData.length; i++){
        var obj=null;
        if(fileData[i].data && fileData[i].data[1])
              obj = tracList.find(val=>val.tracId===fileData[i].data[1]);

        if(obj && obj.status && user){
          let obj2
          if(obj.status === "accepted"){
            obj2 = {
              username:user.email,
              date: fileData[i].data[0],
              transactionId: fileData[i].data[1],
              amount: fileData[i].data[2],
              reward: Math.floor(fileData[i].data[2]/10),
              netAmount: fileData[i].data[2] - Math.floor(fileData[i].data[2]/10),
              status: obj.status
            }
          }
          else{
            obj2 = {
             username:user.email,
             date: fileData[i].data[0],
             transactionId: fileData[i].data[1],
             amount: fileData[i].data[2],
             status: obj.status
           }
          }
          permanantTrac.push(obj2);
        }
      }
      dispatch(fileUploadedOrNot(false));
      dispatch(fileRemoveData());

      console.log("final: ",permanantTrac," selected: ",tracList);
      
      if(permanantTrac && permanantTrac.length>0){
        dispatch(isLoadingFn(true));
        for(let i =0;i< permanantTrac.length; i++){
          await axios.post(`${process.env.REACT_APP_Backend_API}/db/transaction-record`,permanantTrac[i]);
        }
        navigate("/transaction-details"); 
      } 
      dispatch(activeNavComp(false));
      dispatch(removeTracList());
    }

    const handleOnClose = (e) =>{
        e.preventDefault();
        dispatch(fileUploadedOrNot(false));
    }

    // console.log("mystate : ",myState);

  return(
  <>
  <div id="overlay">
  <div id="box">
  <table className="table">
  <thead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">Date</th>
      <th scope="col">Transaction Id</th>
      <th scope="col">Amount</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
  {myState2 && myState2.fileData && myState2.fileData.map((val,index)=>{
    if(index>0)
    return ( 
   <tr key={index}>
       <th scope="row">{index}</th>
       <td>{val.data[0]}</td>
       <td>{val.data[1]}</td>
       <td>{val.data[2]}</td>
       <td>
       <div id={`${val.data[1]}`}>
       <button id="accept" onClick={(e)=>handleOnAccept(e, val.data[1])} className="btn btn-success my-2 my-sm-0" type="submit">Accept</button>
       <button id="reject" onClick={(e)=>{handleOnReject(e,val.data[1])}} className="btn btn-danger my-2 my-sm-0" type="submit">Reject</button>
       </div>
       </td>
     </tr>
       );
       })}
  </tbody>
</table>
<div className="final-buttons">
<button id="done" onClick={handleOnDone} className="btn btn-info my-2 my-sm-0" type="submit">Done</button>
<button id="close" onClick={handleOnClose} className="btn btn-outline-info my-2 my-sm-0" type="submit">Close</button>
</div>
</div>
</div>
</>);
}

export default Overlay;