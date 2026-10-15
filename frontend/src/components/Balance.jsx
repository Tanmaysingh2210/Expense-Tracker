import React, { useContext } from 'react'
import { Assets } from '../assets/Assets'
import { DataContext } from '../context/DataContext'
const Balance = () => {
    const { getTotals } = useContext(DataContext);
    const { income, expense } = getTotals();

  return (
    <div className='balance-box'>
        <div>
            <div className="flex">
                <h3>Total Balance</h3>
                <img src={Assets.down_arrow} alt="" />
            </div>
            <h1>₹{income+expense}</h1>
        </div>

        <div className="container">
            <div className="income">
                <div className="flex center">
                    <img src={Assets.longArrow_down} alt="" />
                    <p>Income</p>
                </div>
                <h2>₹{income}</h2>
            </div>
            <div className="expense ">
                <div className="flex center">
                    <img src={Assets.longArrow_up} alt="" />
                    <p>Expense</p>
                </div>
                <h2>₹{-expense}</h2>
            </div>
        </div>
    </div>
  )
}

export default Balance
