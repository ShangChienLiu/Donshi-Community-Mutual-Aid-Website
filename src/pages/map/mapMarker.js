import React, { useState, useEffect } from "react";

import { greatPlaceStyle } from "./markerStyle";

export default function MapMarker({ postType }) {
  const [markerIcon, setMarkerIcon] = useState("first_menu_food.png");

  useEffect(() => {
    const markerIconList = [
      "first_menu_food.png",
      "first_menu_cloth.png",
      "first_menu_home.png",
      "first_menu_transportation.png",
      "first_menu_education.png",
      "first_menu_entertainment.png",
      "first_menu_health.png",
    ];
    setMarkerIcon(markerIconList[postType.id - 1]);
    return () => {};
  }, [postType]);

  return (
    <div className="map-marker" style={greatPlaceStyle}>
      <img
        className={"w-100 h-100"}
        src={require(`../../assets/image/${markerIcon}`)}
        alt=""
      />
    </div>
  );
}
