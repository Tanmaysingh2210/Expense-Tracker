import React, { useState } from 'react'
import Balance from './Balance'
import TransactionList from './TransactionList'
import AddTransactionModal from './AddTransactionModal'
import { Assets } from '../assets/Assets'

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <div className="home">
                <div className="background">
                    <Balance />
                </div>

                <TransactionList />
            </div>
            {/* <div className='add flex center'>
                <button className='addd' onClick={() => setIsModalOpen(true)}>
                    <span><img src={Assets.add} alt="" /></span>
                    <span>Add Transaction</span>
                </button>
            </div> */}
            {isModalOpen && <AddTransactionModal onClose={() => setIsModalOpen(false)} />}
        </div>
    )
}

export default Home
