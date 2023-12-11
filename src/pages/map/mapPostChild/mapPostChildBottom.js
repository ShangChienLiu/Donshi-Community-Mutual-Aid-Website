import React from "react";

// componenet
import ImageGridList from "../../../components/ImgGrid/ImageGridList";

/**
 *
 * @param post 單篇貼文
 */
export default function MapPostChildBottom({ post }) {
  // 判斷貼文是否有明確顯示時間
  const judgeDate = (date) => {
    return date == null ? "永久" : date;
  };
  // 結合兩個時間
  const combineDate = () => {
    const startDate = judgeDate(post.startDate);
    const endDate = judgeDate(post.endDate);
    return startDate + "~" + endDate;
  };
  return (
    <div className="info-post-child-center d-flex flex-col pb-2">
      {/* 顯示時間 */}
      <p className="post-duration my-1 fs-xs text-blue">{combineDate()}</p>
      {/* 貼文content */}
      <p className="post-text fs-lg my-2 text-gray-6">{post.text}</p>
      {/* 貼文圖片列表 */}
      <div className="post-img-gallery my-3">
        {post.files.length > 0 ? (
          <ImageGridList postImgList={post.files} isPost={true}></ImageGridList>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
