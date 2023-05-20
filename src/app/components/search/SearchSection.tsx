import { Buttom } from "../Buttom";
import Select, { Option } from "../Select";
import { Search } from "./Search";

export default function SearchSection({ onChange, onClick }: any) {
  return (
    <div className=" w-full h-auto bg-white flex justify-center">
      <div className="shadow-2xl flex flex-col gap-4 py-8 px-8 mx-10 rounded-2xl bg-white w-4/5 -translate-y-10">
        <div className="flex gap-4">
          <Search onChange={onChange} />
          <Buttom onClick={onClick} />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Select label={"Provincia:"}>
              <Option selected={true}>{"Todas"}</Option>
              <Option>Amazonas</Option>
            </Select>
            <Select label={"Condición:"}>
              <Option selected={true}>{"cualquiera"}</Option>
              <Option>usados</Option>
            </Select>
          </div>
          <div className="flex gap-4">
            <Buttom
              border="border-blue-500"
              hover="hover:text-white hover:bg-blue-700"
              fontColor="text-blue-800"
              text="Mis carros favoritos"
              color="bg-blue-50"
              onClick={onClick}
            />
            <Buttom
              border="border-blue-500"
              hover="hover:text-white hover:bg-blue-700"
              fontColor="text-blue-800"
              text="Carros Recomendados"
              color="bg-blue-50"
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
