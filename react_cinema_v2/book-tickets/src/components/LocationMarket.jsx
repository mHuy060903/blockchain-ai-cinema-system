import { useMapEvents } from "react-leaflet";

const LocationMarket = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return null;
};

export default LocationMarket;
