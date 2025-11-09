// PeriodBars.jsx
import React, { useContext, useMemo, useState } from "react";
import { DataContext } from "../context/DataContext";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

/** small helper to format money in tooltip */
const fmt = (v) =>
    typeof v === "number" ? v.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : v;


const groupByPeriod = (transactions = [], period = "monthly") => {
    const map = new Map();

    transactions.forEach((tx) => {
        if (!tx || !tx.date) return;
        const d = new Date(tx.date);
        if (isNaN(d)) return;

        let key, label;
        if (period === "monthly") {
            const y = d.getFullYear();
            const m = d.getMonth() + 1; 
            key = `${y}-${String(m).padStart(2, "0")}`; 
            label = `${d.toLocaleString(undefined, { month: "short" })} ${y}`; 
        } else {
            key = `${d.getFullYear()}`; 
            label = key;
        }

        const num = Number(tx.amount) || 0;
        const record = map.get(key) ?? { key, label, income: 0, expense: 0 };
        if (num > 0) record.income += num;
        else record.expense += Math.abs(num);
        map.set(key, record);
    });

    // convert to array and sort by chronological key
    const arr = Array.from(map.values()).sort((a, b) => {
        const pa = period === "monthly" ? new Date(a.key + "-01") : new Date(a.key + "-01-01");
        const pb = period === "monthly" ? new Date(b.key + "-01") : new Date(b.key + "-01-01");
        return pa - pb;
    });

    return arr;
};

export default function PeriodBars({ defaultPeriod = "monthly" }) {
    const [period, setPeriod] = useState(defaultPeriod); // "monthly" or "yearly"

    const {filterExpense, loading} = useContext(DataContext);
    const filteredTransactions = filterExpense();

    const data = useMemo(() => groupByPeriod(filteredTransactions, period), [filteredTransactions, period]);

    if (loading) return <p>Loading...</p>;
    if (!data || data.length === 0) return <p>No data available for the selected period.</p>;

    return (
        <div className="period-bars-card" style={{ padding: 16, background: "#fff", borderRadius: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h3 style={{ margin: 0 }}>Income & Expense ({period === "monthly" ? "Monthly" : "Yearly"})</h3>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <label style={{ fontSize: 14, color: "#555" }}>Period</label>
                    <select value={period} onChange={(e) => setPeriod(e.target.value)} style={{ padding: 6, borderRadius: 6 }}>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
            </div>

            <div style={{ width: "100%", height: 360 }}>
                <ResponsiveContainer>
                    <BarChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" angle={-20} textAnchor="end" interval={0} height={60} />
                        <YAxis />
                        <Tooltip formatter={(v) => fmt(v)} />
                        <Legend />

                        {/* two bars: income and expense */}
                        <Bar dataKey="income" name="Income" fill="#4CAF50" />
                        <Bar dataKey="expense" name="Expense" fill="#F44336" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
