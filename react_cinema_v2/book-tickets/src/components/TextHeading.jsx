/* eslint-disable react/prop-types */
const TextHeading = ({ text, small = false }) => {
  if (small) {
    return (
      <h1 className="text-1xl font-bold text-black my-5 dark:text-white">
        {text}
      </h1>
    );
  }
  return (
    <h1 className="text-3xl font-bold text-black my-6 dark:text-white">
      {text}
    </h1>
  );
};

export default TextHeading;
