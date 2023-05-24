import Link from "next/link";
import { Fragment } from "react";

export default function MenuOptions() {
  return (
    <Fragment>
      <ul className="flex gap-8">
        <li className="text-slate-50">
          <Link href="/signin">Iniciar Sesión</Link>
        </li>
        <li className="text-slate-50">
          <Link href="/signup">Registrarse</Link>
        </li>
      </ul>
    </Fragment>
  );
};
