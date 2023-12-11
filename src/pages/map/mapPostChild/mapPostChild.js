import React from "react";

import MapPostChildTop from "./mapPostChildTop";
import MapPostChildBottom from "./mapPostChildBottom";

export default function MapPostChild({ clickMarkerPost }) {
  return (
    <div className="map-post-child w-100 p-3">
      {/* 貼文上方區域 上方灰線 以上 */}
      <MapPostChildTop post={clickMarkerPost}></MapPostChildTop>
      {/* 貼文下方區域 下方灰線 以下*/}
      <MapPostChildBottom post={clickMarkerPost}></MapPostChildBottom>
    </div>
  );
}
