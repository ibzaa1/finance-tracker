import { useEffect, useRef, useState } from "react";

type Transaction = {
  id: number;
  amount: string;
  description: string | null;
  category: string;
  transaction_type: "income" | "expense";
  created_at: string;
};

type TransactionFormProps = {
  onTransactionCreated: () => void;
  editingTransaction: Transaction | null;
  onEditingComplete: () => void;
};

function TransactionForm({
  onTransactionCreated,
  editingTransaction,
  onEditingComplete,
}: TransactionFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "expense",
  );

  // console.log("FORM EDITING:", editingTransaction);

  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount);
      setDescription(editingTransaction.description || "");
      setCategory(editingTransaction.category);
      setTransactionType(editingTransaction.transaction_type);

      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [editingTransaction]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const transaction = {
      amount,
      description,
      category,
      transaction_type: transactionType,
      created_at: editingTransaction
        ? editingTransaction.created_at
        : new Date().toISOString(),
    };

    const url = editingTransaction
      ? `http://127.0.0.1:8000/transactions/${editingTransaction.id}`
      : "http://127.0.0.1:8000/transactions";

    const method = editingTransaction ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      console.error("Failed to save transaction");
      return;
    }

    const data = await response.json();

    console.log(
      editingTransaction ? "Transaction updated:" : "Transaction created:",
      data,
    );

    onTransactionCreated();

    if (editingTransaction) {
      onEditingComplete();
    }

    setAmount("");
    setDescription("");
    setCategory("");
    setTransactionType("expense");
  };

  return (
    <form ref={formRef} className="transaction-form" onSubmit={handleSubmit}>
      <h2>{editingTransaction ? "Edit Transaction" : "Add Transaction"}</h2>

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
        onChange={(event) =>
          setTransactionType(event.target.value as "income" | "expense")
        }
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button className="submit-button" type="submit">
        {editingTransaction ? "Save Changes" : "Add Transaction"}
      </button>
    </form>
  );
}

export default TransactionForm;
