import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

// components
import MapMarker from "./mapMarker";
import MapPane from "./mapPane";

// apis
import apis from "../../apis";

const center = {
  lat: 23.49,
  lng: 120.17,
};
const zoom = 14;

export default function Map() {
  const [isNeed, setIsNeed] = useState("false");
  const [postType, setPostType] = useState({ id: 1, typeName: "食" });
  const [markerList, setMarkerList] = useState([]);
  const [clickMarkerPost, setClickMarkerPost] = useState(null);

  useEffect(() => {
    const havePosition = (post) => {
      return post.latitude != null && post.longitude != null;
    };
    const getAllPostWithType = async () => {
      const res = await apis.PostApi.getPosts(postType.id, isNeed);
      setMarkerList(res.data.filter(havePosition));
    };
    getAllPostWithType();
    return () => {};
  }, [postType, isNeed]);

  const places = markerList.map((post) => {
    const { id, latitude, longitude, ...coords } = post;
    return (
      <MapMarker
        key={id}
        id={id}
        lat={latitude}
        lng={longitude}
        {...coords}
        postType={postType}
      />
    );
  });

  const onChildClick = (key, childProps) => {
    setClickMarkerPost(childProps);
  };
  return (
    <div
      className={"map"}
      style={{ height: "100vh", width: "100%"}}
    >
      <MapPane
        setIsNeed={setIsNeed}
        setPostType={setPostType}
        clickMarkerPost={clickMarkerPost}
      ></MapPane>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCNG6uJNWEzAN5ctmzgGqMpSVgeO59Zdkw" }}
        defaultCenter={center}
        defaultZoom={zoom}
        onChildClick={onChildClick}
      >
        {places}
      </GoogleMapReact>
    </div>
  );
}
