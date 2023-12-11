import React from "react";

import { greatPlaceStyle } from "../../../pages/map/markerStyle";

export default function ChooseLocMarker() {

  return (
    <div className="choose-loc-marker" style={greatPlaceStyle}>
      <img
        className={"w-100 h-100"}
        src={require(`../../../assets/image/location.png`)}
        alt=""
      />
    </div>
  );
}
