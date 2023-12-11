import React from "react";
import Config from "../../../Config";
const { BASEURL } = Config;

export default function MapPostChildTop({post}) {
  return (
    <div className={"info-post-child-top pb-3"}>
      <div className="child-top-container d-flex ai-center">
        {/* 貼文主人大頭貼 */}
        <img
          className="user-img"
          src={post.user.pictureUrl
            ? `${BASEURL}${post.user.pictureUrl}`
            : require("../../../assets/image/profile.png")}
          alt=""
        />
        {/* 貼文主人、時間資訊 */}
        <div className="child-top-right ml-1 d-flex flex-col ">
          <p className="user-name m-0 mt-1 fs-md">{post.user.username}</p>
          <p className="post-time m-0 mt-1 fs-xxs text-gray ">
            2天前 {/* 未完成 */}
          </p>
        </div>

        {/* 貼文主題 */}
        <div className="child-top-topic fs-lg text-dark-green">
          {post.topic.topicName}
        </div>
      </div>

      {/* 貼文標題 */}
      <div className="child-top-title mt-3 ml-1 fs-xl fw-bold">
        {post.title}
      </div>
    </div>
  );
}
