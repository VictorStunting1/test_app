export function FunnyStat({
  label,
  value,
  index,
}: {
  label: string;
  value: number;
  index: number;
}) {
  return (
    <div className="funny-stat">
      <span className={`stat-dot tone-${index}`} />
      <strong>{value} %</strong>
      <span>{label}</span>
    </div>
  );
}
