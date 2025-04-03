/* eslint-disable react/prop-types */

import { useSearchParams } from "react-router-dom";

const Filter = ({ filterField, options, isNum = true }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let currentFilter = searchParams.get(filterField)
    ? searchParams.get(filterField)
    : options.at(0).value;

  if (isNum) {
    currentFilter = Number(currentFilter);
  }

  const handleClick = (value) => {
    searchParams.set(filterField, value);

    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  };

  return (
    <div className="flex gap-1 items-center">
      {options.map((option) => (
        <button
          key={option.value}
          className={`p-1 font-semibold rounded-md text-sm transition-all duration-300 ${
            currentFilter === option.value
              ? "bg-blue-600 text-white"
              : "bg-white text-black hover:bg-blue-600 hover:text-white"
          }`}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
