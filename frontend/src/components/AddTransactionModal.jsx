import { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";

const AddTransactionModal = ({ onClose }) => {
  const { addExpense } = useContext(DataContext);

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      name: text,
      amount: +amount,
      date: date || new Date().toISOString().split("T")[0], 
      type: amount < 0 ? "expense" : "income",
      
    };
    
    addExpense(newTransaction);

    // ✅ Clear form after adding
    setText("");
    setAmount("");
    setDate("");

    
    onClose(); // close modal
  };
  
  return (

    <div className="home">
      <div className="background"></div>
      <div className="adding ">
        <div className="container add-transaction-container">
          <h3 >Add New Transaction</h3>

          <form onSubmit={handleSubmit} className="add-transaction-form">
            <label>Text: </label>
            <input
              type="text"
              placeholder="Enter text..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />

            <label >Amount</label>
            <input
              type="number"
              placeholder="Enter amount..."

              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            {/* <small className="text-gray-500">negative = expense, positive = income</small> */}

            <label >Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <div className="button-group">
              <button
                type="button"
                className="button-cancel"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="button-add"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;



  //   return (
    
  //     <div className="home">
  //       <div className="background"></div>
  //       <div className="adding ">
  //         <div className="container add-transaction-container">
  //           <h3 >Add New Transaction</h3>

  //           <form onSubmit={handleSubmit} className="add-transaction-form">
  //               <label className="block">Text: </label>
  //               <input
  //                 type="text"
  //                 placeholder="Enter text..."
  //                 value={text}
  //                 onChange={(e) => setText(e.target.value)}
  //                 required
  //               />

  //             <div className="mb-3">
  //               <label className="block">Amount</label>
  //               <input
  //                 type="number"
  //                 value={amount}
  //                 onChange={(e) => setAmount(e.target.value)}
  //                 required
  //               />
  //               {/* <small className="text-gray-500">negative = expense, positive = income</small> */}
  //             </div>

  //             <div className="mb-3">
  //               <label className="block">Date</label>
  //               <input
  //                 type="date"
  //                 value={date}
  //                 onChange={(e) => setDate(e.target.value)}
  //               />
  //             </div>

  //             <div className="flex justify-between mt-4">
  //               <button
  //                 type="button"
  //                 onClick={onClose}
  //               >
  //                 Cancel
  //               </button>
  //               <button
  //                 type="submit"
  //               >
  //                 Add
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default AddTransactionModal;


