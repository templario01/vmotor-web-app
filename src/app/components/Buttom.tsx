"use client";
import { Tooltip } from "react-tooltip";
import { useAuthState } from "../../context/auth.context";

export interface ButtomProps {
  onClick?: () => Promise<void>;
  text?: string;
  color?: string;
  hover?: string;
  fontColor?: string;
  border?: string;
  toolTipId?: string;
  toolTipText?: string;
}

export default function Buttom({
  onClick,
  border,
  toolTipId,
  toolTipText,
  text = "Buscar",
  color = "bg-blue-600",
  hover = "hover:bg-blue-700",
  fontColor = "text-slate-50",
}: ButtomProps) {
  const auth = useAuthState();

  return (
    <div>
      <button
        data-tooltip-id={toolTipId}
        data-tooltip-content={toolTipText}
        className={`${color} py-4 px-12 rounded-xl h-auto ${hover} ${fontColor} ${
          border ? "border-2 " + border : ""
        }`}
        onClick={onClick}
      >
        {text}
      </button>
      {toolTipId && !auth.isAuthenticated && <Tooltip id={toolTipId} />}
    </div>
  );
}
