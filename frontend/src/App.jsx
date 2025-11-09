import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home';
import Statistics from './components/Statistics'
import History from './components/History';
import AddTransactionModal from './components/AddTransactionModal';

function App() {

  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/add_transaction" element={<AddTransactionModal />} />
        </Routes>
    </>
  )
}

export default App
