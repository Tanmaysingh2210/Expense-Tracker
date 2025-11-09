import TransactionList from './TransactionList'
import { DataContext } from '../context/DataContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Transaction from './Transaction'

const History = () => {
  const { expenses } = useContext(DataContext);

  return (
    <div>
      <div className="home">
        <div className="background">
          <div className='transaction'>
            <div className="flex between">
              <h2 className='head'>Transactions History</h2>
            </div>
            <ul className="list">
              {expenses.map((expense) => (
                  <Transaction
                    key={expense._id}
                    transaction={expense}
                  />
                ))
              }

            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default History
