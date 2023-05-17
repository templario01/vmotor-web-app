export const Buttom = ({
  onClick,
  text = "Search",
  color = "bg-red-600",
  hover = "bg-red-500",
}: any) => {
  return (
    <div>
      <button
        className={`${color} text-slate-50 py-4 px-12 rounded-xl h-auto hover:${hover}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};
