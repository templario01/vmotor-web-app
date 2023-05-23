"use client"
import { useAuthState } from "../../../context/auth.context";
import { Buttom } from "../Buttom";
import Select, { Option } from "../Select";
import { Search } from "./Search";
import { Tooltip } from 'react-tooltip'

export default function SearchSection({ onChange, onClick }: any) {
  const auth = useAuthState();

  if (auth.isAuthenticated) {
    
  }
  
  return (
    <div className=" w-full h-auto bg-white flex justify-center">
      <div className="shadow-2xl flex flex-col gap-4 py-8 px-8 mx-10 rounded-2xl bg-white w-4/5 -translate-y-10">
        <div className="flex gap-4">
          <Search onChange={onChange} />
          <Buttom onClick={onClick} />
        </div>
        <div className="flex justify-between items-end">
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
              border={auth.isAuthenticated ? "border-blue-500" : "border-disabled-2" }
              hover={auth.isAuthenticated ? "hover:text-white hover:bg-blue-700" : "hover:text-disabled-3 hover:bg-disabled-1"}
              fontColor={auth.isAuthenticated ? "text-blue-800" : "text-disabled-3"}
              text="Mis carros favoritos"
              color={auth.isAuthenticated ? "bg-blue-50" : "bg-disabled-1"}
              toolTipId="favorites"
              toolTipText="inicia sesión para usar esta funcionalidad"
              onClick={undefined}
            />
            <Buttom
              border={auth.isAuthenticated ? "border-blue-500" : "border-disabled-2" }
              hover={auth.isAuthenticated ? "hover:text-white hover:bg-blue-700" : "hover:text-disabled-3 hover:bg-disabled-1"}
              fontColor={auth.isAuthenticated ? "text-blue-800" : "text-disabled-3"}
              text="Carros Recomendados"
              color={auth.isAuthenticated ? "bg-blue-50" : "bg-disabled-1"}
              toolTipId="recommended"
              toolTipText="inicia sesión para usar esta funcionalidad"
              onClick={undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
