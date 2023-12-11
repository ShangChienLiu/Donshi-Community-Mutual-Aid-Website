import React, { useState, useEffect } from "react";

// components
import PostList from "../postList/postList";
import PopPost from "../popPost/popPost";
import DeleteEditPop from "../deleteEditPop/popDeleteEdit";

// apis
import apis from "../../apis";

export default function SearchPost({
  myInfo,
  location,
  searchActive,
  setSearchActive,
  searchText,
  setSearchText,
}) {
  // 彈跳視窗 pop post state
  const [topStyle, setTopStyle] = useState({ top: window.pageYOffset + "px" }); // 彈跳視窗的絕對位置高度style
  const [showPopPost, setShowPopPost] = useState(0); // 設定彈跳視窗主體是否出現
  const [showMainPop, setShowMainPop] = useState(1); // 設定彈跳視窗-發布貼文區塊 是否出現
  const [isMapPop, setIsMapPop] = useState(false);
  const [showChoosePop, setShowChoosePop] = useState(0); // 設定彈跳視窗-貼文內容(時間、圖片、位址)選擇區塊 是否出現
  const [searchPostType, setSearchPostType] = useState({
    id: 1,
    typeName: "食",
  });
  // 編輯刪除彈跳視窗 state
  const [showDeleteEditPop, setShowDeleteEditPop] = useState(0);

  // 貼文列表state
  const [postList, setPostList] = useState([]); // 設定貼文列表
  const [isNeed, setIsNeed] = useState("false");
  const [deleteEditPost, setDeleteEditPost] = useState({
    index: -1,
    post: {},
    edit: false,
  });
  const [refreshPost, setRefreshPost] = useState(false); // 當對貼文做出任何舉動時要刷新貼文

  useEffect(() => {
    const searchPost = async () => {
      const res = await apis.PostApi.query(searchText, isNeed);
      setPostList(res.data);
    };
    if (searchText !== "") searchPost();
    return () => {};
  }, [searchText]);

  useEffect(() => {
    const pathArr = location.pathname.split("/");
    const lastPathName = pathArr.pop();
    lastPathName === "need" ? setIsNeed("true") : setIsNeed("false");
    return () => {};
  }, [location]);

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
        setShowMainPop(1); // 顯示彈跳視窗-發布貼文區快
        setDeleteEditPost({ index: -1, post: {}, edit: false });
        canMove();
      }
    }

    document.addEventListener("click", hidePopPost);

    return () => {
      document.removeEventListener("click", hidePopPost);
    };
  }, []);

  // UI刪除貼文 不是資料庫
  const deletePostFromList = (index) => {
    if (index > -1) {
      postList.splice(index, 1);
      window.location.reload();
    }
  };

  // UI編輯貼文 不是資料庫
  const editPostFromList = (index, post) => {
    if (index > -1) {
      postList[index] = post;
      window.location.reload();
    }
  };

  const closeSearch = () => {
    setSearchActive(0);
    setSearchText("");
  };

  return (
    <div
      className={`search-post ${searchActive === 1 ? "" : "search-post-none"}`}
    >
      <div className="search-container bg-gray-1 p-3">
        <div className="search-title-container d-flex py-2">
          <p className="search-title fs-lg p-0 m-0 px-2 text-center flex-1">
            查詢結果
          </p>
          <i
            className="search-close iconfont icon-close fs-xl"
            onClick={() => closeSearch()}
          ></i>
        </div>
        <PostList
          setShowPopPost={setShowPopPost}
          setShowDeleteEditPop={setShowDeleteEditPop}
          setDeleteEditPost={setDeleteEditPost}
          postList={postList}
          isEmpty={true}
          setTopStyle={setTopStyle}
          myInfo={myInfo}
          closePost={[]}
          setSearchPostType={setSearchPostType}
        ></PostList>
      </div>
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
        postType={searchPostType}
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
  );
}
