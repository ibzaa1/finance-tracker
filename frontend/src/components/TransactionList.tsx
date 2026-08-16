import { useEffect, useState } from "react";

type Transaction = {
  id: number;
  amount: string;
  description: string | null;
  category: string;
  transaction_type: "income" | "expense";
  created_at: string;
};

type TransactionListProps = {
  refreshKey: number;
  onTransactionDeleted: () => void;
  onTransactionEdit: (transaction: Transaction) => void;
};

function TransactionList({
  refreshKey,
  onTransactionDeleted,
  onTransactionEdit,
}: TransactionListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      });
  }, [refreshKey]);

  const deleteTransaction = async (id: number) => {
    const response = await fetch(`http://127.0.0.1:8000/transactions/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Failed to delete transaction");
      return;
    }

    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== id),
    );

    onTransactionDeleted();
  };

  return (
    <div className="transaction-list">
      <div className="transaction-container">
        <h2>Recent Transactions</h2>

        {transactions.length === 0 ? (
          <p className="no-transactions">No transactions available.</p>
        ) : (
          transactions.map((transaction) => (
            <div className="transaction-item" key={transaction.id}>
              <div>
                <strong>{transaction.description || "No description"}</strong>
                <p>{transaction.category}</p>
              </div>

              <div>
                <strong>
                  {transaction.transaction_type === "income" ? "+" : "-"}£
                  {transaction.amount}
                </strong>
                <p>{transaction.transaction_type}</p>
              </div>

              <div className="transaction-actions">
                <button
                  className="edit-button"
                  onClick={() => {
                    console.log("EDIT CLICKED", transaction);
                    onTransactionEdit(transaction);
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionList;
