import { useSearchParams } from "react-router-dom";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
const Pagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const PAGE_SIZE = Number(import.meta.env.VITE_PAGE_SIZE);
  const MAX_PAGE = Math.ceil(count / PAGE_SIZE);

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const handleSetPage = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm">
        Showing
        <span className="font-medium"> {(page - 1) * PAGE_SIZE + 1} </span>
        from
        <span className="font-medium">
          {" "}
          {page === MAX_PAGE ? count : page * PAGE_SIZE}{" "}
        </span>
        data
      </p>
      <div className="flex items-center bg-slate-800 rounded-lg">
        {page > 1 && (
          <div
            onClick={() => handleSetPage(page - 1)}
            className="py-2 px-3 hover:cursor-pointer hover:bg-slate-950 transition-all duration-300  rounded-md"
          >
            <MdOutlineKeyboardArrowLeft size={20} />
          </div>
        )}
        {Array.from({ length: MAX_PAGE }).map((item, index) => (
          <div
            onClick={() => handleSetPage(index + 1)}
            key={index}
            className={`py-2 px-3 hover:cursor-pointer hover:bg-slate-950 transition-all duration-300  rounded-md ${
              page === index + 1 ? "bg-green-600" : " "
            }  font-medium `}
          >
            {index + 1}
          </div>
        ))}

        {page < MAX_PAGE && (
          <div
            onClick={() => handleSetPage(page + 1)}
            className="py-2 px-3 hover:cursor-pointer hover:bg-slate-950 transition-all duration-300  rounded-md"
          >
            <MdOutlineKeyboardArrowRight size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
