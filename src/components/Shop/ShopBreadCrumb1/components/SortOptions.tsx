import React from 'react';
import * as Icon from '@phosphor-icons/react/dist/ssr';

interface SortOptionsProps {
  selectedSortOption: string;
  handleSortOptionChange: (option: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({
  selectedSortOption,
  handleSortOptionChange,
}) => {
  return (
    <div className="relative hidden lg:block">
      <label className="font-semibold">Sort By: </label>
      <select
        value={selectedSortOption}
        onChange={(e) => handleSortOptionChange(e.target.value)}
        className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
      >
        <option className="bg-[#f7f7f7]" value="Newest First">
          Newest First
        </option>
        <option className="bg-[#f7f7f7]" value="Price-Low To High">
          Price-Low To High
        </option>
        <option className="bg-[#f7f7f7]" value="Price-High To Low">
          Price-High To Low
        </option>
      </select>
      <div className="pointer-events-none absolute inset-y-7 bottom-0 right-0 ml-3 flex items-center px-2 text-gray-700">
        <Icon.CaretDown size={18} />
      </div>
    </div>
  );
};

export default SortOptions; 