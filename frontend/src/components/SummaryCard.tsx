type SummaryCardProps = {
  title: string;
  value: string;
};

function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <div className="summary-card">
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
}

export default SummaryCard;
