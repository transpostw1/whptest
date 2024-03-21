import React from "react";
import * as Icon from "@phosphor-icons/react";

const FilterSidebar = ({ selectedOptions, handleOptionSelect, filterDropDown, handleFilterDropdown, Filter }) => {
  return (
    <div className={`sidebar lg:w-4/3 md:w-1/3 w-full md:pr-12 lg:block hidden`}>
      <div className={`filter-type pb-8 border-line h-[550px] no-scrollbar overflow-y-auto `}>
        <div className="heading6 border-b-2">FILTER BY</div>
        <div className="mt-5">
          <p className="heading7">Applied Filters</p>
        </div>

        <div className="flex flex-wrap">
          {selectedOptions.map((option, index) => (
            <div
              key={index}
              className="border border-[#e26178] bg-[#fcf4f6] text-[#e26178] px-[10px] py-[5px] mr-1 mt-1"
            >
              {option}
              <button
                className="ml-2 align-middle mb-1"
                onClick={() => handleOptionSelect(option)}
              >
                <Icon.X size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="list-type mt-4">
          {Filter.map((item, index) => (
            <div
              key={index}
              className={`item cursor-pointer`}
              onClick={() => handleFilterDropdown(item.title)}
            >
              <div className="text-secondary flex justify-between has-line-before cursor-pointer hover:text-black  capitalize">
                <p className="text-lg font-semibold">{item.title}</p>

                <p className="mt-1">
                  <Icon.CaretDown weight="fill" />
                </p>
              </div>
              
              {filterDropDown === item.title && (
                <div>
                  {item.options.map((option, index) => (
                    <div key={option}>
                      <input
                        type="checkbox"
                        id={option}
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleOptionSelect(option)}
                      />
                      <label className="ml-2" htmlFor={option}>
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
