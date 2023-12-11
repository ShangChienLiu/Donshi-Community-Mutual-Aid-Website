import React from "react";
import { Link } from "react-router-dom";

export default function Notification({ noti, setNotiPostId, location }) {
  const judgeUrl = () => {
    if(location.pathname === "/home/post"){
      window.location.reload();
    }
    return "/home/post"
  }

  return (
    <Link
      to={judgeUrl}
      className="notification d-flex p-3 ai-start j-center"
      onClick={() => setNotiPostId(noti.post.id)}
    >
      <div className="noti-icon-container">
        <i className="iconfont icon-notification fs-xxl text-blue-1 d-flex mr-2 pt-2"></i>
      </div>
      <div className="noti-info-container">
        <div className="noti-info-title fs-lgs fw-bold">
          {noti.name} {noti.title}
        </div>
        <div
          className="noti-info-text"
          dangerouslySetInnerHTML={{ __html: noti.text }}
        ></div>
      </div>
    </Link>
  );
}
