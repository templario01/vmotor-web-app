import { Cup } from "iconsax-react";
export const Tag = ({ topNumber }: any) => {
  return (
    <div className="rounded-tl-lg absolute mt-1 ml-0 text-xs inline-flex gap-1 items-center font-bold 
    leading-sm uppercase px-3 py-1 bg-orange-200 text-orange-700 rounded-ful">
      <Cup />
      Top #{topNumber} Best Price
    </div>
  );
};
