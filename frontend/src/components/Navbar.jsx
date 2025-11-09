import React from 'react'
import { Assets } from '../assets/Assets'
import { Link } from 'react-router-dom'
import Slidebar from './slidebar.jsx'
import { useState } from 'react'

const Navbar = () => {
  const [isSlidebarOpen, setIsSlidebarOpen] = useState(false);

  return (
    <nav>
      <div className="menu">
        <img src={Assets.Menu} onClick={() => setIsSlidebarOpen(!isSlidebarOpen)} className={isSlidebarOpen ? "open":"close"} alt="" />
      </div>
      {isSlidebarOpen && <Slidebar value={{isSlidebarOpen, setIsSlidebarOpen}} open={isSlidebarOpen}  onClose={() => setIsSlidebarOpen(false)} />}

      <ul className='navbar-links'>
        <li><img src={Assets.home} alt="" /><p><Link to={`/`}>Home</Link></p></li>
        <li><img src={Assets.graph} alt="" /><p><Link to={`/statistics`}>Statistics</Link></p></li>
        <li><img src={Assets.add} alt="" /><p><Link to={`/add_transaction`}>Add Transaction</Link></p></li>
        {/* <li><img src={Assets.history} alt="" /><p><Link to={`/history`}>History</Link></p></li> */}
      </ul>
    </nav>
  )
}

export default Navbar
