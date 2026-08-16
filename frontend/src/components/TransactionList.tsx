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
};

function TransactionList({ refreshKey }: TransactionListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      });
  }, [refreshKey]);

  return (
    <div className="transaction-list">
      <h2>Recent Transactions</h2>

      {transactions.map((transaction) => (
        <div className="transaction" key={transaction.id}>
          <div>
            <strong>{transaction.description}</strong>
            <p>{transaction.category}</p>
          </div>

          <div>
            <strong>£{transaction.amount}</strong>
            <p>{transaction.transaction_type}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
