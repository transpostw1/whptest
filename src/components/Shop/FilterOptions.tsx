import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

interface Filter {
  title: string;
  options: string[];
  labels: string[];
}

const Filter: Filter[] = [
  {
    title: "Price",
    options: [
      "0to10000",
      "10000to20000",
      "20000to30000",
      "30000to40000",
      "40000to50000",
      "50000to10000000",
    ],
    labels: [
      "Less than 10K (18)",
      "10K to 20K (13)",
      "20K to 30K (17)",
      "30K to 40K (16)",
      "40K to 50K (25)",
      "50K and above (194)",
    ],
  },
  {
    title: "Karat",
    options: ["950", "14KT", "22KT", "18KT", "92.5", "SILVER"],
    labels: [
      "950 (1)",
      "14KT (2)",
      "22KT (217)",
      "18KT (44)",
      "92.5 (11)",
      "SILVER (8)",
    ],
  },
  {
    title: "Weight",
    options: ["0to2gms", "10gmsandabove", "2to5gms", "5to10gms"],
    labels: [
      "0-2 gms grams (7)",
      "2-5 gms grams (46)",
      "5-10 gms grams (80)",
      "10gms and above grams (150)",
    ],
  },
  {
    title: "Shop_For",
    options: ["men", "women", "kids", "unisex"],
    labels: ["Men (71)", "Women (253)", "Kids (49)", "Unisex (45)"],
  },
  {
    title: "Metal",
    options: ["gold", "platinum", "silver", "sterling_silver"],
    labels: [
      "Gold (263)",
      "Platinum (1)",
      "Silver (11)",
      "Sterling silver (8)",
    ],
  },
  {
    title: "Occasion",
    options: [
      "casual_wear",
      "party_wear",
      "work_wear",
      "wedding_wear",
      "everyday",
      "engagement",
    ],
    labels: [
      "Casual Wear (92)",
      "Party Wear (58)",
      "Work Wear (37)",
      "Wedding Wear (28)",
      "Everyday (1)",
      "Engagement (1)",
    ],
  },
];

interface Props {
  filters:any;
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
  return (
    <>
      {filters.map((item: Filter, index: number) => (
        <div
          key={index}
          className="item cursor-pointer"
          onClick={() => handleFilterDropdown(item.title)}
        >
          <div className="text-secondary has-line-before flex cursor-pointer justify-between capitalize hover:text-black">
            <p className="text-lg font-semibold">{item.title}</p>

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
