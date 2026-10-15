import React, { useContext } from 'react'
import Transaction from './Transaction'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/DataContext.jsx'

const TransactionList = () => {
    const { filterExpense, loading } = useContext(DataContext);
    const filteredTransaction = filterExpense();

    if (loading) return <p>Loading...</p>;
    return (
        <div className='transaction'>
            <div className="flex between">
                <h2 className='head'>Transactions History</h2>
            </div>
            <ul className="list">
                {filteredTransaction.length > 0 ? (
                    filteredTransaction.map((expense) => (
                        <Transaction
                            key={expense._id}
                            transaction={expense}
                        />
                    ))
                ) : (
                    <p>No transactions this month</p>
                )}

            </ul>
        </div>
    )
}

export default TransactionList
