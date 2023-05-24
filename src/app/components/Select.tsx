"use client";

export default function Select({ label, children, handleChange, defaultValue }: any) {
  return (
    <div>
      <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <select
        onChange={handleChange}
        defaultValue={defaultValue}
        id="provincias"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {children}
      </select>
    </div>
  );
}

