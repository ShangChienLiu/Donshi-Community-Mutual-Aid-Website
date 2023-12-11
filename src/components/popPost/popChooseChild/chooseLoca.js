import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

// components
import ChooseLocMarker from "./chooseLocMarker";

export default function ChooseLoca({
  setChildPopShow,
  setIsMapPop,
  setPostLocation,
}) {
  const center = {
    lat: 23.49,
    lng: 120.17,
  };
  const zoom = 14;
  const [markerCenter, setMarkerCenter] = useState(center);

  const closeMap = () => {
    setIsMapPop(false);
    setChildPopShow();
  };

  const onChildClick = (key, childProps) => {
    setPostLocation(childProps);
    closeMap();
  };

  return (
    <div
      className={"choose-post-position d-flex flex-col"}
      style={{ height: "90vh", width: "90%", position: "absolute" }}
    >
      <i
        className="iconfont icon-leftarrow fs-xl bg-white p-1 text-gray-6 d-flex jc-center ai-center p-3"
        onClick={() => closeMap()}
      ></i>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCNG6uJNWEzAN5ctmzgGqMpSVgeO59Zdkw" }}
        defaultCenter={center}
        defaultZoom={zoom}
        onChange={(map) => setMarkerCenter(map.center)}
        onChildClick={onChildClick}
      >
        <ChooseLocMarker
          lat={markerCenter.lat}
          lng={markerCenter.lng}
        ></ChooseLocMarker>
      </GoogleMapReact>
    </div>
  );
}
