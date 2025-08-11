interface DetailItemProps {
  label: string;
  value: string | number;
}

const DetailItem = ({ label, value }: DetailItemProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-500 mb-1">{label}</span>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
};

export default DetailItem;
