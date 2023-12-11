import React, { useState } from "react";

// component
import PostCommentList from "./postComment/postCommentList";

/**
 *
 * @param post 單篇貼文
 */
export default function InfoPostBottom({ post, myInfo, allUserNameList, index }) {
  const [commentActive, setCommentActive] = useState(1); // 判斷是否顯示留言

  // useEffect(() => {
  //   setCommentActive(post.recodeCommentActive);
  //   return () => {};
  // }, [post]);

  return (
    <div className="info-post-child-bottom mt-2">
      {/* 點擊顯示或隱藏留言區塊 */}
      <div
        className="leave-comment-container d-flex ai-center jc-center fs-lg text-gray-6"
        onClick={() =>
          commentActive === 0 ? setCommentActive(1) : setCommentActive(0)
        }
      >
        <i className="iconfont icon-comment fs-xlx mt-1"></i>
        <p className="m-0 ml-1">留言</p>
      </div>
      {/* 留言區塊 */}
      <PostCommentList
        post={post}
        commentActive={commentActive}
        myInfo={myInfo}
        allUserNameList={allUserNameList}
        index={index}
      ></PostCommentList>
    </div>
  );
}
