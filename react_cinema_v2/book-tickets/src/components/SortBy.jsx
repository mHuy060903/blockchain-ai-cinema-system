import { useSearchParams } from "react-router-dom";

const SortBy = ({ options = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";

  const handleChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <select
      onChange={handleChange}
      className="text-black p-2 rounded-lg outline-none"
    >
      {options.map((cur, index) => (
        <option selected={sortBy === cur.value} key={index} value={cur.value}>
          {cur.label}
        </option>
      ))}
    </select>
  );
};

export default SortBy;
