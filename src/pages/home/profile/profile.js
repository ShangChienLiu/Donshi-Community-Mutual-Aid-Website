import React, { useState, useEffect } from "react";

// components
import SelfIntro from "./selfIntro/selfIntro";
import SelfInfoEdit from "./selfIntro/selfInfoEdit/selfInfoEdit";
import SelfPostList from "../../../components/postList/postList";
import PopPost from "../../../components/popPost/popPost";
import DeleteEditPop from "../../../components/deleteEditPop/popDeleteEdit";

// apis
import apis from "../../../apis";

export default function Profile({ myInfo, setMyInfo }) {
  // 彈跳視窗 pop post state
  const [topStyle, setTopStyle] = useState({ top: window.pageYOffset + "px" }); // 彈跳視窗的絕對位置高度style
  const [showPopPost, setShowPopPost] = useState(0); // 設定彈跳視窗主體是否出現
  const [showMainPop, setShowMainPop] = useState(1); // 設定彈跳視窗-發布貼文區塊 是否出現
  const [showChoosePop, setShowChoosePop] = useState(0); // 設定彈跳視窗-貼文內容(時間、圖片、位址)選擇區塊 是否出現
  const [isMapPop, setIsMapPop] = useState(false);
  const [selfPostType, setSelfPostType] = useState({ id: 1, typeName: "食" });

  const [showDeleteEditPop, setShowDeleteEditPop] = useState(0); // 編輯刪除彈跳視窗 state

  const [showSelfInfoEdit, setShowSelfInfoEdit] = useState(false); // 編輯自介彈跳視窗 state

  // 貼文列表state
  const [postList, setPostList] = useState([]); // 設定貼文列表
  const [isNeed, setIsNeed] = useState("false");
  const [deleteEditPost, setDeleteEditPost] = useState({
    index: -1,
    post: {},
    edit: false,
  });
  const [refreshPost, setRefreshPost] = useState(false); // 當對貼文做出任何舉動時要刷新貼文
  const [postNum, setPostNum] = useState(0);

  // 設定監聽網頁點擊消除彈跳視窗
  useEffect(() => {
    function hidePopPost(e) {
      const canMove = () => {
        let mo = function (e) {
          e.preventDefault();
        };
        document.body.style.overflow = ""; //出現滾動條
        document.removeEventListener("touchmove", mo, false); //移除禁止頁面滑動
      };

      // 當滑鼠點擊deleteEditPop 外圍白框時 要消失
      if (e.target.id === "deleteEditPop") {
        setShowDeleteEditPop(0); // 隱藏編輯刪除
        canMove();
      }

      // 當滑鼠點擊popPost 外圍白框時 要消失
      if (e.target.id === "popPost") {
        setShowPopPost(0); // 隱藏彈跳視窗主體
        setShowChoosePop(0); // 隱藏彈跳視窗-貼文內容(時間、圖片、位址)選擇區塊
        setIsMapPop(false); // 隱藏選擇地圖
        setShowMainPop(1); // 顯示彈跳視窗-發布貼文區快
        setDeleteEditPost({ index: -1, post: {}, edit: false });
        canMove();
      }

      // 當滑鼠點擊deleteEditPop 外圍白框時 要消失
      if (e.target.id === "selfInfoEdit") {
        setShowSelfInfoEdit(false); // 隱藏編輯刪除
        canMove();
      }
    }

    document.addEventListener("click", hidePopPost);

    return () => {
      document.removeEventListener("click", hidePopPost);
    };
  }, []);
  useEffect(() => {
    const getMyPost = async () => {
      const res = await apis.UserApi.getMyPosts(isNeed);
      setPostList(res.data);
      setPostNum(res.data.length);
    };

    getMyPost();
  }, [isNeed]);

  // UI刪除貼文 不是資料庫
  const deletePostFromList = (index) => {
    if (index > -1) {
      postList.splice(index, 1);
    }
  };

  // UI編輯貼文 不是資料庫
  const editPostFromList = (index, post) => {
    if (index > -1) {
      postList[index] = post;
    }
  };

  return (
    <div className="profile d-flex flex-col ai-center pb-3">
      <div className="self-space bg-white w-100 d-flex flex-col">
        <SelfIntro
          myInfo={myInfo}
          postNum={postNum}
          setTopStyle={setTopStyle}
          setShowSelfInfoEdit={setShowSelfInfoEdit}
        ></SelfIntro>
        <div className="self-space-bg bg-blue-4 w-100"></div>
      </div>
      <SelfInfoEdit
      setMyInfo={setMyInfo}
        myInfo={myInfo}
        topStyle={topStyle}
        showSelfInfoEdit={showSelfInfoEdit}
        setShowSelfInfoEdit={setShowSelfInfoEdit}
      ></SelfInfoEdit>
      <div className="self-post-isNeed-change mt-3">
        <button
          className={`self-post-isNeed self-post-info fs-xl bg-gray-1 px-3 py-2 mr-3 ${
            isNeed === "true" ? "" : "bg-green"
          }`}
          onClick={() => setIsNeed("false")}
        >
          資訊
        </button>
        <button
          className={`self-post-isNeed self-post-need fs-xl bg-gray-1 px-3 py-2 ${
            isNeed === "true" ? "bg-green" : ""
          }`}
          onClick={() => setIsNeed("true")}
        >
          需求
        </button>
      </div>
      <div className="self-post-container px-3">
        <SelfPostList
          setShowPopPost={setShowPopPost}
          setShowDeleteEditPop={setShowDeleteEditPop}
          setDeleteEditPost={setDeleteEditPost}
          postList={postList}
          isEmpty={true}
          setTopStyle={setTopStyle}
          myInfo={myInfo}
          closePost={[]}
          setSelfPostType={setSelfPostType}
        ></SelfPostList>
        <PopPost
          showMainPop={showMainPop}
          setShowMainPop={setShowMainPop}
          showChoosePop={showChoosePop}
          setShowChoosePop={setShowChoosePop}
          showPopPost={showPopPost}
          setShowPopPost={setShowPopPost}
          isNeed={isNeed}
          refreshPost={refreshPost}
          setRefreshPost={setRefreshPost}
          myInfo={myInfo}
          postType={selfPostType}
          deleteEditPost={deleteEditPost}
          setDeleteEditPost={setDeleteEditPost}
          editPostFromList={editPostFromList}
          isMapPop={isMapPop}
          setIsMapPop={setIsMapPop}
        ></PopPost>
        <DeleteEditPop
          topStyle={topStyle}
          showDeleteEditPop={showDeleteEditPop}
          setShowDeleteEditPop={setShowDeleteEditPop}
          deletePostFromList={deletePostFromList}
          setDeleteEditPost={setDeleteEditPost}
          deleteEditPost={deleteEditPost}
          setShowPopPost={setShowPopPost}
        ></DeleteEditPop>
      </div>
    </div>
  );
}
