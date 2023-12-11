import React, { useState, useEffect } from "react";
import { useSocketIO } from "../../../helper/useSocketio";

// components
import PostChildTop from "./postChildTop";
import PostChildCenter from "./postChildCenter";
import PostChildBottom from "./postChildBottom";

// tools
// 判斷貼文左邊顏色
import chooseColor from "../../topicColor/chooseTopicColor";

/**
 *
 * @param setShowPopPost 設定彈跳視窗主體是否出現
 * @param setShowDelEditPop 設定彈跳視窗-編輯刪除 是否出現
 * @param post 單篇貼文
 * @param index 單篇貼文位址
 * @param setTopStyle 設定彈跳視窗主體高度
 * @param myInfo 個人資訊
 */
export default function InfoPostChild({
  setShowDeleteEditPop,
  setDeleteEditPost,
  post,
  index,
  setTopStyle,
  myInfo,
  setSelfPostType,
  setSearchPostType,
  setSinglePostType,
  closePost,
  allUserNameList,
}) {
  const [postChild, setPostChild] = useState(post);
  useEffect(() => {
    setPostChild(post);
    return () => {};
  }, [post]);

  const notVisible = {
    display: "none",
  };

  const canVisible = {
    display: "block",
  };

  const setPostVisiBle = () => {
    if (closePost) {
      return closePost.includes(postChild.topic.id) ||
        (postChild.endDate != null &&
          new Date().getTime() - new Date(postChild.endDate).getTime() > 0)
        ? notVisible
        : canVisible;
    } else {
      return postChild.endDate != null &&
        new Date().getTime() - new Date(postChild.endDate).getTime() > 0
        ? notVisible
        : canVisible;
    }
  };

  const onChange = ({ post }) =>
    setPostChild((prePost) => (prePost.id === post.id ? post : prePost));
  const [hasError, hasConnect] = useSocketIO(onChange);

  return (
    // 單篇貼文 會依照貼文類型有不一樣的border
    <li
      className={`info-post-child w-100 mt-4 bg-white p-3 ${chooseColor(
        post.type.id - 1
      )}`}
      style={setPostVisiBle()}
    >
      <div className="info-post-child-container">
        {/* 貼文上方區域 上方灰線 以上 */}
        <PostChildTop
          post={postChild}
          index={index}
          myInfo={myInfo}
          setTopStyle={setTopStyle}
          setShowDeleteEditPop={setShowDeleteEditPop}
          setDeleteEditPost={setDeleteEditPost}
          setSelfPostType={setSelfPostType}
          setSinglePostType={setSinglePostType}
          setSearchPostType={setSearchPostType}
        ></PostChildTop>
        {/* 貼文中間區域 兩條灰線間*/}
        <PostChildCenter post={postChild}></PostChildCenter>
        {/* 貼文下方區域 下方灰線 以下*/}
        <PostChildBottom
          post={postChild}
          myInfo={myInfo}
          allUserNameList={allUserNameList}
          index={index}
        ></PostChildBottom>
      </div>
    </li>
  );
}
