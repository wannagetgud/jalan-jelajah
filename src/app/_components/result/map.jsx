import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import { icon } from "leaflet";

import "leaflet/dist/leaflet.css";
export default function Maps({ lat, long, places }) {
  const size = 36;
  return (
    <MapContainer
      center={[lat, long]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-[50vh] rounded-xl mt-12 shadow-card z-30"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place, index) => {
        return (
          <Marker
            key={index}
            position={[place.lat, place.long]}
            icon={icon({
              iconUrl: "/assets/location.png",
              iconSize: [32, 32],
            })}
          >
            <Popup>{place.place_name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
