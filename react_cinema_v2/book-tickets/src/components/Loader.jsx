import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ color = "white", size = 50 }) => {
  return (
    <ClipLoader
      color={color}
      loading={true}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
