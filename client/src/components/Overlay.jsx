import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
// import { transactionAcceptList, transactionRejectList, fileUploadedOrNot, fileRemoveData, isLoadingFn, activeNavComp, removeTracList } from "../actions/actions";
import axios from "axios";
import { acceptList, rejectList, removeTransactionList, allTransactionList } from "../slice/transactionSlice";
import { removeFile, changeFile, toggleIsFileUploaded } from "../slice/fileSlice";
import { loading, activeNavComp } from "../slice/otherSlice";
import Loading from "./Loading";
const Overlay = () => {
  const dispatch = useDispatch();
  const { transacList } = useSelector((state) => state.transaction);
  const { fileData } = useSelector((state) => state.file);
  const { user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.other);
  const navigate = useNavigate();

  const handleOnAccept = (e, tracId) => {
    e.preventDefault();
    dispatch(acceptList(tracId));
    let ele = document.getElementById(`${tracId}`);
    if (ele) {
      ele.innerHTML = `<h5 id="acceptStamp">Accepted</h5>`;
    }
  }

  const handleOnReject = (e, tracId) => {
    e.preventDefault();
    dispatch(rejectList(tracId));
    let ele = document.getElementById(`${tracId}`);
    if (ele) {
      ele.innerHTML = `<h5 id="rejectStamp">Rejected</h5>`;
    }
  }

  const handleOnDone = async (e) => {
    e.preventDefault();
    var permanantTrac = [];
    var tracList = transacList;

    for (let i = 1; tracList && fileData && i < fileData.length; i++) {
      var obj = null;
      if (fileData[i].data && fileData[i].data[1])
        obj = tracList.find(val => val.tracId === fileData[i].data[1]);

      if (obj && obj.status && user) {
        let obj2
        if (obj.status === "accepted") {
          obj2 = {
            username: user.email,
            date: fileData[i].data[0],
            transactionId: fileData[i].data[1],
            amount: fileData[i].data[2],
            reward: Math.floor(fileData[i].data[2] / 10),
            netAmount: fileData[i].data[2] - Math.floor(fileData[i].data[2] / 10),
            status: obj.status
          }
        }
        else {
          obj2 = {
            username: user.email,
            date: fileData[i].data[0],
            transactionId: fileData[i].data[1],
            amount: fileData[i].data[2],
            status: obj.status
          }
        }
        permanantTrac.push(obj2);
      }
    }
    dispatch(toggleIsFileUploaded(false));
    dispatch(removeFile());

    console.log("final: ", permanantTrac, " selected: ", tracList);

    if (permanantTrac && permanantTrac.length > 0) {
      dispatch(loading(true));
      for (let i = 0; i < permanantTrac.length; i++) {
        await axios.post(`${process.env.REACT_APP_Backend_API}/db/transaction-record`, permanantTrac[i]);
      }
    }
    dispatch(activeNavComp(false));
    dispatch(removeTransactionList());
    navigate("/transaction-details");
  }

  const handleOnClose = (e) => {
    e.preventDefault();
    dispatch(toggleIsFileUploaded(false));
  }

  if(isLoading) return <Loading />;


  return (
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
              {fileData?.map((val, index) => {
                if (index > 0)
                  return (
                    <tr key={index}>
                      <th scope="row">{index}</th>
                      <td>{val.data[0]}</td>
                      <td>{val.data[1]}</td>
                      <td>{val.data[2]}</td>
                      <td>
                        <div id={`${val.data[1]}`}>
                          <button id="accept" onClick={(e) => handleOnAccept(e, val.data[1])} className="btn btn-success my-2 my-sm-0" type="submit">Accept</button>
                          <button id="reject" onClick={(e) => { handleOnReject(e, val.data[1]) }} className="btn btn-danger my-2 my-sm-0" type="submit">Reject</button>
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