"use client";

import { Fragment } from "react";

export default function Select({ label, children }: any) {
  return (
    <div>
      <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <select
        id="provincias"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {children}
      </select>
    </div>
  );
}

export const Option = ({
  selected = false,
  children,
  value = undefined,
}: any) => {
  return (
    <Fragment>
      <option selected={selected} value={value}>
        {children}
      </option>
    </Fragment>
  );
};
