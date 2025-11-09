import React, { useContext, useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, Legend } from 'recharts';
import { DataContext } from '../context/DataContext';
import PeriodBars from './periodBar';

const Statistics = () => {
  const { filterExpense, loading, getTotals } = useContext(DataContext);
  const filteredTransaction = filterExpense(); // make filter work by period

  const { income, expense } = getTotals();

  console.log("Income:", income, "Expense:", expense);

  if (loading) return <p>Loading...</p>;


  const buildTrendData = (filteredTransaction) => {
    // Group by date
    const grouped = {};

    filteredTransaction.forEach(tx => {
      const date = new Date(tx.date).toLocaleDateString();

      if (!grouped[date]) {
        grouped[date] = { date, income: 0, expense: 0 };
      }

      if (tx.amount > 0) {
        grouped[date].income += tx.amount;
      } else {
        grouped[date].expense += Math.abs(tx.amount);
      }
    });

    const sortedData = Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );


    return sortedData;
  };


  const pieData = [
    { name: "Income", value: income },
    { name: "Expense", value: -expense },
  ];

  const COLORS = ["#82ca9d", "#ff6961"];

  return (
    <div className="stats">

      {/* Summary */}
      <div className="summary">
        <div className="card income">Income: ₹{income}</div>
        <div className="card expense">Expense: ₹{-expense}</div>
        <div className="card balance">Balance: ₹{income + expense}</div>
      </div>

      {/* Charts */}
      <div className="charts">
        {/* Area Chart */}
        <div className="chart-box">
          <h3>Trend Over Time</h3>
          <AreaChart width={600} height={250} data={buildTrendData(filteredTransaction)}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff6961" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff6961" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="income" stroke="#82ca9d" fillOpacity={1} fill="url(#colorIncome)" />
            <Area type="monotone" dataKey="expense" stroke="#ff6961" fillOpacity={1} fill="url(#colorExpense)" />
          </AreaChart>
        </div>
        {/* Pie Chart */}
        <div className="chart-box">
          <h3>Income vs Expense</h3>
          <PieChart width={300} height={250}>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} label dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </div>


        <div className="chart-box">
          <PeriodBars defaultPeriod="monthly" />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
