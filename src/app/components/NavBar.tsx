"use client";
import { useAuthState } from "../../context/auth.context";
import dynamic from "next/dynamic";
const DropdownMenu = dynamic(() => import("./DropdownMenu"), {
  ssr: false,
});
const MenuOptions = dynamic(() => import("./MenuOptions"), {
  ssr: false,
});

export default function NabBar() {
  const auth = useAuthState();

  return (
    <div
      className="container mx-auto w-auto absolute right-0 left-0 h-28 items-center
    flex justify-between z-50"
    >
      <div>
        <h1 className="text-slate-50 font-extrabold text-3xl">VMOTOR</h1>
      </div>
      <div>{auth?.isAuthenticated ? <DropdownMenu /> : <MenuOptions />}</div>
    </div>
  );
}
