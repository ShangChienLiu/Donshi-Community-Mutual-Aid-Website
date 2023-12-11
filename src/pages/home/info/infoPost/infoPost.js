import React from "react";

// components
import InfoSelfPost from "./infoSelfPost";
import InfoPostList from "../../../../components/postList/postList";

// 貼文圖片更換
const postChangeLsit = [
  {
    img: "food.png",
  },
  {
    img: "clothing.png",
  },
  {
    img: "housing.png",
  },
  {
    img: "transportation.png",
  },
  {
    img: "education.png",
  },
  {
    img: "entertainment.png",
  },
  {
    img: "healthcare.png",
  },
];

/**
 *
 * @param setTopStyle 設定彈跳視窗主體高度
 * @param setShowDelEditPop 設定編輯刪除彈跳視窗是否出現
 * @param isNeed 設定資訊或需求貼文
 * @param refreshPost 設定是否刷新貼文
 * @param postType 貼文類型(食衣住行....)
 * @param setShowPopPost 設定彈跳視窗主體
 * @param myInfo 個人資訊
 */
export default function InfoPost({
  setTopStyle,
  postList,
  setShowDeleteEditPop,
  setDeleteEditPost,
  isEmpty,
  postType,
  setShowPopPost,
  myInfo,
  closePost,
}) {
  return (
    <div className="info-post d-flex jc-center py-4">
      <div className="info-post-container d-flex flex-col ai-center">
        {/* 貼文類型圖片 */}
        <img
          className="info-post-title-img mr-7 mb-3"
          src={require(`../../../../assets/image/${
            postChangeLsit[postType.id - 1].img
          }`)}
          alt=""
        />
        {/* 發布貼文 */}
        <InfoSelfPost myInfo={myInfo} setShowPopPost={setShowPopPost} setTopStyle={setTopStyle}></InfoSelfPost>
        {/* 貼文列表 */}
        <InfoPostList
          setShowPopPost={setShowPopPost}
          setShowDeleteEditPop={setShowDeleteEditPop}
          setDeleteEditPost={setDeleteEditPost}
          postList={postList}
          isEmpty={isEmpty}
          setTopStyle={setTopStyle}
          myInfo={myInfo}
          closePost={closePost}
        ></InfoPostList>
      </div>
    </div>
  );
}
