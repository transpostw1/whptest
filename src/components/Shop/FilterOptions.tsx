import React, { useEffect } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

interface Filter {
  title: string;
  options: string[];
  labels: string[];
}



interface Props {
  filters: any;
  filterDropDown: string;
  handleMobileFilter: () => void;
  handleFilterDropdown: (arg: string) => void;
  handleOptionSelect: (option: string, category: string) => void;
  selectedOptions: { [key: string]: string[] };
}

const FilterOptions: React.FC<Props> = ({
  filters,
  filterDropDown,
  handleMobileFilter,
  handleFilterDropdown,
  handleOptionSelect,
  selectedOptions,
}) => {
  useEffect(() => {
    handleFilterDropdown("");
  }, [filters]);

  return (
    <>
      {filters.map((item: Filter, index: number) => (
        <div
          key={index}
          className="item cursor-pointer"
          onClick={() => handleFilterDropdown(item.title)}
        >
          <div className="text-secondary has-line-before flex cursor-pointer justify-between capitalize hover:text-black">
            <p className="text-lg font-semibold">
              {item.title.replace(/_/g, " ")}
            </p>

            <p className="mt-1">
              <Icon.CaretDown weight="fill" />
            </p>
          </div>
          {filterDropDown === item.title ? (
            <div>
              {item.options.map((option: string, idx: number) => (
                <div key={option} onClick={() => handleMobileFilter()}>
                  <input
                    type="checkbox"
                    id={option}
                    value={option}
                    checked={selectedOptions[item.title]?.includes(option)}
                    onChange={() => handleOptionSelect(option, item.title)}
                  />
                  <label className="ml-2" htmlFor={option}>
                    {item.labels[idx]}
                  </label>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default FilterOptions;
