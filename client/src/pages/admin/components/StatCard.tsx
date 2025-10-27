type StatCardProps = {
  title: string;
  value: string;
};
const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className='stats shadow w-1/4'>
      <div className='stat'>
        <div className='stat-title text-2xl'>{title}</div>
        <div className='stat-value'>{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
