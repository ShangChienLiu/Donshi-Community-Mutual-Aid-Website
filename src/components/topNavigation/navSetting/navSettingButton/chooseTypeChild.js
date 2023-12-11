import React, { useState } from "react";

/**
 * @param index 
 * @param topic 
 * @param closePost 
 * @param setCloseTypePost 
 */
export default function NavSetting({
  index,
  topic,
  closePost,
  setCloseTypePost,
}) {
  const [isClose, setIsClose] = useState(false);

  const checkTypePost = (topic) => {
    const typeIndex = closePost.indexOf(topic.id);
    if (typeIndex !== -1) {
      let newCloseTypePost = [...closePost];
      newCloseTypePost.splice(typeIndex, 1);
      setCloseTypePost(newCloseTypePost);
    } else {
      let newCloseTypePost = [...closePost];
      newCloseTypePost.push(topic.id);
      setCloseTypePost(newCloseTypePost);
    }

    isClose ? setIsClose(false) : setIsClose(true);
  };
  return (
    <div
      id={"choosePostText"}
      key={index}
      className={`${isClose ? "button-close-topic" : "button-open-topic"} py-2 px-3 m-1 fs-lgs`}
      onClick={() => checkTypePost(topic)}
    >
      {topic.topicName}
    </div>
  );
}
