import classNames from "classnames";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const badgeClass = classNames(
    "px-10 py-2 font-semibold rounded-lg",
    {
      "bg-gray-300 text-white": status === "draft",
      "bg-blue-500 text-white": status === "published",
    }
  );

  return (
    <span className={badgeClass}>
      {status === "draft" ? "下書き" : "登録済"}
    </span>
  );
};

export default StatusBadge;
