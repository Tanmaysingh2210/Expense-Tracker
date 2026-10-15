import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");

    const baseUrl = 'http://localhost:5000'


    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await fetch(`${baseUrl}/expenses`);
                const data = await response.json();
                if (data.length > 0) {
                    setExpenses(data);
                }
                setLoading(false);
            }
            catch (err) {
                console.error('Error fetching transaction: ', err);
                setLoading(false);
            }
        }
        fetchExpense();
    }, []);

    const addExpense = async (newExpense) => {
        try {
            const res = await fetch(`${baseUrl}/expenses/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newExpense),
            });
            const savedExpense = await res.json();

            setExpenses((prev) => [...prev, savedExpense]);
        }
        catch (err) {
            console.error("Error adding Transation: ", err);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await fetch(`${baseUrl}/expenses/${id}`, {
                method: "DELETE",
            });

            setExpenses((prev) => prev.filter((expenses) => expenses._id !== id));
        }
        catch (err) {
            console.error("Error deleting expense: ", err);
        }
    };

    const filterExpense = () => {
        const now = new Date();
        const currentMonth = now.getMonth();

        return expenses.filter(exp => {
            const date = new Date(exp.date);

            if (filter == "ALL") {
                return true; //all
            }
            if (filter == "LAST_MONTH") {
                const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
                return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear();
            }
            if (filter == "THIS_YEAR") {
                return date.getFullYear() === now.getFullYear();
            }
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        });
    };

    // ---- Totals ----
    const getTotals = () => {
        const filtered = filterExpense();
        let income = 0, expense = 0;

        filtered.forEach(t => {
            if (t.amount > 0) income += t.amount;
            else expense += t.amount;
        });

        return { income, expense };
    };

    return (
        <DataContext.Provider value={{ expenses, setExpenses, addExpense, loading, deleteExpense, filter, setFilter, filterExpense, getTotals }}>
            {children}
        </DataContext.Provider>
    );

}
