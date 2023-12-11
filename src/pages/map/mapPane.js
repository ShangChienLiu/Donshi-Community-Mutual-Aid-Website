import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// components
import MapPaneMenu from "./mapPaneMenu";
import MapPostChild from "./mapPostChild/mapPostChild";

export default function MapPane({ setIsNeed, setPostType, clickMarkerPost }) {
  useEffect(() => {
    console.log(clickMarkerPost);
    return () => {};
  }, [clickMarkerPost]);
  const [mapPaneActive, setMapPaneActive] = useState(true);
  return (
    <div
      className={`map-pane d-flex ${mapPaneActive ? "map-pane-active" : ""}`}
    >
      <div className={`map-pane-container`}>
        <MapPaneMenu
          setIsNeed={setIsNeed}
          setPostType={setPostType}
        ></MapPaneMenu>
        {clickMarkerPost != null ? (
          <MapPostChild clickMarkerPost={clickMarkerPost}></MapPostChild>
        ) : (
          <></>
        )}
      </div>
      <button
        className={"map-close-bt bg-white d-flex jc-center ai-center"}
        onClick={() =>
          mapPaneActive ? setMapPaneActive(false) : setMapPaneActive(true)
        }
      >
        {mapPaneActive ? (
          <i className={"iconfont icon-left fs-md p-1 text-gray-6"}></i>
        ) : (
          <i className={"iconfont icon-right fs-md p-1 text-gray-6"}></i>
        )}
      </button>

      <Link
        to="/"
        className={"map-home-link bg-white d-flex jc-center ai-center"}
        href="#"
      >
        <img
          className={"map-home-logo"}
          src={require("../../assets/image/logo_pure.png")}
          alt="CIRAS-logo"
        />
      </Link>
    </div>
  );
}
