import React, { useContext } from 'react'
import Transaction from './Transaction'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/DataContext.jsx'

const TransactionList = () => {
    const { filterExpense, loading } = useContext(DataContext);

    // const now = new Date();
    // const currentMonth = now.getMonth();
    // const currentYear = now.getFullYear();

    // const thisMonthExpenses = expenses.filter((expense) => {
    //     const expenseDate = new Date(expense.date);
    //     return (
    //         expenseDate.getMonth() === currentMonth &&
    //         expenseDate.getFullYear() === currentYear
    //     );
    // });

    const filteredTransaction = filterExpense();
    

    if (loading) return <p>Loading...</p>;
    return (
        <div className='transaction'>
            <div className="flex between">
                <h2 className='head'>Transactions History</h2>
                {/* <p>See All</p> */}
                {/* <Link className='redirect' to={`/history`}>See All</Link> */}
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
