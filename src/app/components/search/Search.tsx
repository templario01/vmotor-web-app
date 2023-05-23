
"use client"
export const Search = ({ onChange, onFocus }: any) => {
  return (
    <div className="w-full text-gray-600 h-14">
      <input
        onChange={onChange}
        className="w-full h-full px-5 pr-16 rounded-xl text-base focus:outline-none bg-slate-100"
        type="search"
        name="search"
        placeholder="modelo, marca, año..."
        onFocus={onFocus}
      />
    </div>
  );
};