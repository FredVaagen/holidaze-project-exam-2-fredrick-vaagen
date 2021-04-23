import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import { GOOGLE_API } from "../../../constants/api";

const SimpleMap = (props) => {
  const longitude = props.lng;
  const latitude = props.lat;

  const getMapOptions = (maps, map) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
      ],
    };
  };

  const [center, setCenter] = useState({ lat: latitude, lng: longitude });
  const [zoom, setZoom] = useState(11);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={getMapOptions}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => getMapOptions(map, maps)}>
        <Marker
          lat={latitude}
          lng={longitude}
          name={props.address}
          color="blue"
          
        />
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
