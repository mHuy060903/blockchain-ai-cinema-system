/* eslint-disable react/prop-types */

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const LocationMap = ({ position = [51.505, -0.09], name }) => {
  return (
    <div className="h-[150px] w-[150px] ">
      <MapContainer
        className="h-[250px] w-[250px] "
        center={position}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;
