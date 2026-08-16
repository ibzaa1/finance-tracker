import { useEffect, useState } from "react";
import SummaryCard from "./components/SummaryCard";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import "./App.css";

function App() {
  const [summary, setSummary] = useState({
    total_income: "0.00",
    total_expenses: "0.00",
    net_balance: "0.00",
  });

  const [refreshKey, setRefreshKey] = useState(0);

  const handleTransactionCreated = () => {
    setRefreshKey((value) => value + 1);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/transactions/summary")
      .then((response) => response.json())
      .then((data) => {
        setSummary(data);
      });
  }, [refreshKey]);

  return (
    <div className="dashboard">
      <h1>Finance Tracker</h1>
      <p>Manage your money in one place.</p>

      <h2>Your finances at a glance</h2>

      <div className="summary-grid">
        <SummaryCard title="Total Income" value={`£${summary.total_income}`} />

        <SummaryCard
          title="Total Expenses"
          value={`£${summary.total_expenses}`}
        />

        <SummaryCard title="Balance" value={`£${summary.net_balance}`} />

        <SummaryCard title="Number of Transactions" value="42" />
      </div>
      <TransactionForm onTransactionCreated={handleTransactionCreated} />
      <TransactionList refreshKey={refreshKey} />
    </div>
  );
}

export default App;
