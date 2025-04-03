import { useMap } from "react-leaflet";

const ChangMapCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

export default ChangMapCenter;
