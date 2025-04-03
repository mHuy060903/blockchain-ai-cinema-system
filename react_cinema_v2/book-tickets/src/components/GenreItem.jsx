/* eslint-disable react/prop-types */
const GenreItem = ({ genre, onToggleGenresSelected, isSelected }) => {
  return (
    <button
      onClick={() => {
        onToggleGenresSelected(genre.id);
      }}
      className={`border-[2px] p-2 font-medium text-nowrap rounded-2xl text-gray-700 dark:text-white my-2 ${
        isSelected ? "bg-purple-600 text-white" : ""
      }`}
    >
      {genre.name}
    </button>
  );
};

export default GenreItem;
