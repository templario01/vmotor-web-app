"use client";
import Link from "next/link";

export default function NabBar() {
  return (
    <div
      className="container mx-auto w-auto absolute right-0 left-0 h-28 items-center
    flex justify-between z-50"
    >
      <div>
        <h1 className="text-slate-50 font-extrabold text-3xl">VMOTOR</h1>
      </div>
      <div>
        <ul className="flex gap-8">
          <li className="text-slate-50">
            <Link href="/signin">Iniciar Sesión</Link>
          </li>
          <li className="text-slate-50">
            <Link href="/signup">Registrarse</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
