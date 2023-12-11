import React from "react";
import Config from "../../../Config";
const { BASEURL } = Config;

/**
 *
 * @param setShowPopPost 設定彈跳視窗主體是否出現
 * @param setShowDelEditPop 設定彈跳視窗-編輯刪除 是否出現
 * @param post 單篇貼文
 * @param index 單篇貼文位址
 * @param setTopStyle 設定彈跳視窗主體高度
 * @param myInfo 個人資訊
 */
export default function InfoPostTop({
  post,
  index,
  myInfo,
  setTopStyle,
  setShowDeleteEditPop,
  setDeleteEditPost,
  setSelfPostType,
  setSearchPostType,
  setSinglePostType,
}) {
  // 開啟彈跳視窗-編輯刪除
  const openDelEdit = () => {
    if (setSelfPostType != null) setSelfPostType(post.type);
    if (setSearchPostType != null) setSearchPostType(post.type);
    if(setSinglePostType != null) setSinglePostType(post.type);
    setTopStyle({ top: window.pageYOffset + "px" });
    setShowDeleteEditPop(1);
    setDeleteEditPost({ index: index, post: post, edit: false });
    let mo = function (e) {
      e.preventDefault();
    };
    document.body.style.overflow = "hidden"; //隱藏滾動條
    document.addEventListener("touchmove", mo, false); //禁止頁面滑動
  };

  const countTwoDate = () => {
    const nowDate = new Date();
    const postDate = new Date(Date.parse(post.createdAt.replace(/-/g, "/")));
    const betweenDateMin = parseInt((nowDate - postDate) / (1000 * 60));
    const betweenDateHour = parseInt((nowDate - postDate) / (1000 * 60 * 60));
    const betweenDateDay = parseInt(
      (nowDate - postDate) / (1000 * 60 * 60 * 24)
    );
    if (betweenDateHour >= 24) {
      return betweenDateDay + "天前";
    } else if (betweenDateHour < 24 && betweenDateHour >= 1) {
      return betweenDateHour + "小時前";
    } else {
      if (betweenDateMin > 0) {
        return betweenDateMin + "分鐘前";
      } else {
        return "剛剛";
      }
    }
  };

  return (
    <div className="info-post-child-top pb-3">
      <div className="child-top-container d-flex ai-center">
        {/* 貼文主人大頭貼 */}
        <img
          className="user-img"
          src={
            post.user.pictureUrl
              ? `${BASEURL}${post.user.pictureUrl}`
              : require("../../../assets/image/profile.png")
          }
          alt=""
        />
        {/* 貼文主人、時間資訊 */}
        <div className="child-top-right ml-1 d-flex flex-col ">
          <p className="user-name m-0 mt-1 fs-md">{post.user.username}</p>
          <p className="post-time m-0 mt-1 fs-xxs text-gray ">
            {countTwoDate()}
          </p>
        </div>

        {/* 貼文主題 */}
        <div className="child-top-topic fs-lg text-dark-green">
          {post.topic.topicName}
        </div>

        {/* 開啟彈跳視窗-編輯刪除 */}
        <i
          onClick={openDelEdit}
          className={`post-setting iconfont icon-2601caidan2 fs-xxl ml-1 ${
            myInfo.role === 0 || myInfo.id === post.user.id
              ? "child-top-setting-block"
              : "child-top-setting-none"
          }`}
        ></i>
      </div>

      {/* 貼文標題 */}
      <div className="child-top-title mt-3 ml-1 fs-xl fw-bold">
        {post.title}
      </div>
    </div>
  );
}
