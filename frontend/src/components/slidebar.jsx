import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext';

const slidebar = ({ onClose, isSlidebarOpen }) => {
    const { setFilter, filter } = useContext(DataContext);
    return (
        <>
            <div className={isSlidebarOpen ? "left turnOFF" : "left turnON"}>
                <div className="kent">
                    <div className={`class ${filter === "" ? "active" : ""}`} onClick={() => setFilter("")}>This Month</div>
                    <div className={`class ${filter === "LAST_MONTH" ? "active" : ""}`} onClick={() => setFilter("LAST_MONTH")}>Last Month</div>
                    <div className={`class ${filter === "THIS_YEAR" ? "active" : ""}`} onClick={() => setFilter("THIS_YEAR")}>This year</div>
                    <div className={`class ${filter === "ALL" ? "active" : ""}`} onClick={() => setFilter("ALL")}>All</div>
                </div>
            </div>

        </>
    )
}

export default slidebar
