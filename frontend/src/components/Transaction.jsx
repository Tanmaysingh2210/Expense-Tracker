import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext';
import { Assets } from '../assets/Assets';

const Transaction = ({ transaction }) => {
    const { deleteExpense } = useContext(DataContext);

    const formatDate = (isoDate) => { //yyyy-mm-dd
        if (!isoDate) return "";
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`; //dd-mm-yyyy
    };

    const sign = (transaction.type === "expense" ? '-' : '+');
    return (
        <li className='flex single'>
            <button onClick={() => deleteExpense(transaction._id)} className="delete-btn"><img src={Assets.deleteBtn} alt="" /></button>
            <div>
                <span className='name'>{transaction.name}</span>
                <span className='date'>{(formatDate(transaction.date)).slice(0, 10)}</span>
                <span className={transaction.type == "expense" ? 'minus' : 'plus'}>{sign}₹{Math.abs(transaction.amount)} </span>
            </div>
        </li>
    )
}

export default Transaction
