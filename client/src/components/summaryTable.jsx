import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function SummaryTable() {
    const { allTransactionsFromDB } = useSelector((state) => state.transaction);
    const {
        transCount,
        totalAmount,
        totalNetAmount,
        totalRewards,
        acceptedTransCount
    } = useSelector((state) => state.summary); 
    const { user } = useSelector((state) => state.user);
    const { isLoading } = useSelector((state) => state.other);
    if(!user && !isLoading){console.log("navigate to home"); return <Navigate to="/" />;}
    return (
        <div>
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

                    {allTransactionsFromDB?.map((val, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{val.date}</td>
                                <td>{val.transactionId}</td>
                                <td>{val.amount}</td>
                                {val.status === "accepted" ? <td>{val.reward}</td> : <td>-</td>}
                                {val.status === "accepted" ? <td>{val.netAmount}</td> : <td>-</td>}
                                {val.status === "accepted" ? <td id="acceptStamp">Accepted</td> : <td id="rejectStamp">Rejected</td>}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div id="summary-box">
                <h3>Summary : </h3>
                <table className="table table-striped table-dark">
                    <tbody>
                        <tr>
                            <th scope="row">Total Transaction</th>
                            <td>{transCount}</td>
                        </tr>
                        <tr>
                            <th scope="row">Total Transaction with Reward</th>
                            <td>{acceptedTransCount}</td>
                        </tr>
                        <tr>
                            <th scope="row">Total Amount</th>
                            <td>{totalAmount}</td>
                        </tr>
                        <tr>
                            <th scope="row">Total Reward</th>
                            <td>{totalRewards}</td>
                        </tr>
                        <tr>
                            <th scope="row">Total Net Amount</th>
                            <td>{totalNetAmount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SummaryTable;