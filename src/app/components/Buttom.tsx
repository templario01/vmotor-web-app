export interface ButtomProps {
  onClick?: () => Promise<void>;
  text?: string;
  color?: string;
  hover?: string;
  fontColor?: string;
  border?: string;
}

export const Buttom = ({
  onClick,
  border,
  text = "Buscar",
  color = "bg-blue-600",
  hover = "hover:bg-blue-700",
  fontColor = "text-slate-50",
}: ButtomProps) => {
  return (
    <div>
      <button
        className={`${color} py-4 px-12 rounded-xl h-auto ${hover} ${fontColor} ${
          border ? "border-2 " + border : ""
        }`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};
