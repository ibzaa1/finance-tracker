import { useState } from "react";

type TransactionFormProps = {
  onTransactionCreated: () => void;
};

function TransactionForm({ onTransactionCreated }: TransactionFormProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [transactionType, setTransactionType] = useState("expense");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const transaction = {
      amount: amount,
      description: description,
      category: category,
      transaction_type: transactionType,
      created_at: new Date().toISOString(),
    };

    const response = await fetch("http://127.0.0.1:8000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      console.error("Failed to create transaction");
      return;
    }

    const data = await response.json();

    console.log("Transaction created:", data);

    onTransactionCreated();
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      />

      <select
        value={transactionType}
        onChange={(event) => setTransactionType(event.target.value)}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button className="submit-button" type="submit">
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;
