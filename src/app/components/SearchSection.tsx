import { Buttom } from "./Buttom";
import ComboBox from "./ComboBox";
import { Search } from "./Search";

export default function SearchSection({ onChange, onClick }: any) {
  return (
    <div className="w-full h-36 bg-white flex justify-center">
      <div className="shadow-2xl flex gap-4 py-8 px-8 mx-10 rounded-2xl bg-white w-4/5 -translate-y-10">
        <Search onChange={onChange} />
        <Buttom onClick={onClick} />
      </div>
    </div>
  );
}
