// FilterOptions.tsx
import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

interface Filter {
  title: string | any;
  options: string[];
}

interface Props {
  filterDropDown: string;
  handleFilterDropdown: (arg: string) => void;
  handleOptionSelect: (option: string, category: string) => void;
  selectedOptions: any;
}

const FilterOptions: React.FC<Props> = ({
  filterDropDown,
  handleFilterDropdown,
  handleOptionSelect,
  selectedOptions,
}) => {
  const Filter: Filter[] = [
    {
      title: "Price",
      options: ["Less than 10K", "10k to 20K", "20k to 30k", "30k and Above"],
    },
    {
      title: "Karat",
      options: ["14KT", "22KT", "24KT"],
    },
    {
      title: "Weight",
      options: ["0-2 g", "2-5 g", "5-10 g", "10-20 g"],
    },
    {
      title: "Gender",
      options: ["Men", "Women", "Kids"],
    },
    { title: "Type", options: [] },
    {
      title: "Style",
      options: [],
    },
    {
      title: "Occasion",
      options: [
        "Everyday",
        "Work Wear",
        "Wedding",
        "Desk to Dinner",
        "Evening",
        "Party Wear",
      ],
    },
    { title: "Colours", options: [] },
    {
      title: "Delivery",
      options: ["Fast Delivery", "Cash On Delivery", "EMI"],
    },
    { title: "Categories", options: ["Gold Earrings", "Diamond Earrings"] },
  ];

  return (
    <>
      {Filter.map((item: Filter, index: number) => (
        <div
          key={index}
          className={`item cursor-pointer`}
          onClick={() => handleFilterDropdown(item.title)}
        >
          <div className="text-secondary flex justify-between has-line-before cursor-pointer hover:text-black capitalize">
            <p className="text-lg font-semibold">{item.title}</p>

            <p className="mt-1">
              <Icon.CaretDown weight="fill" />
            </p>
          </div>
          {filterDropDown === item.title ? (
            <div>
              {item.options.map((option: string) => (
                <div key={option}>
                  <input
                    type="checkbox"
                    id={option}
                    checked={selectedOptions[item.title]?.includes(option)}
                    onChange={() => handleOptionSelect(option, item.title)}
                  />
                  <label className="ml-2" htmlFor={option}>
                    {option}
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