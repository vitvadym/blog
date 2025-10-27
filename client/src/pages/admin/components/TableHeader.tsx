type Props = {
  headers: string[];
};

const TableHeader: React.FC<Props> = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index + 1}>{header}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
