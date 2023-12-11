import React, { useState, useEffect } from "react";

// component
import LeftNavigation from "../../../components/leftNavigation/leftNavigation";
import InfoPost from "../info/infoPost/infoPost";
import PopPost from "../../../components/popPost/popPost";
import DeleteEditPop from "../../../components/deleteEditPop/popDeleteEdit";

// API
import apis from "../../../apis";

export default function Need({
  myInfo,
  postType,
  setpostType,
  location,
  closePost,
}) {
  // 彈跳視窗 pop post state
  const [topStyle, setTopStyle] = useState({ top: window.pageYOffset + "px" }); // 彈跳視窗的絕對位置高度style
  const [showPopPost, setShowPopPost] = useState(0); // 設定彈跳視窗主體是否出現
  const [showMainPop, setShowMainPop] = useState(1); // 設定彈跳視窗-發布貼文區塊 是否出現
  const [showChoosePop, setShowChoosePop] = useState(0); // 設定彈跳視窗-貼文內容(時間、圖片、位址)選擇區塊 是否出現
  const [isMapPop, setIsMapPop] = useState(false);
  // 編輯刪除彈跳視窗 state
  const [showDeleteEditPop, setShowDeleteEditPop] = useState(0);

  // 貼文列表state
  const [postList, setPostList] = useState([]); // 設定貼文列表
  const [postOffset, setPostOffset] = useState(0); // 貼文目前數量
  const [isEmpty, setIsEmpty] = useState(false); // 是否get不到貼文了
  const [isNeed, setIsNeed] = useState(() => {
    // 設定目前是需求還是資訊貼文(從URL 資訊判斷)
    const pathArr = location.pathname.split("/");
    const lastPathName = pathArr.pop();
    if (lastPathName === "need") {
      return "true";
    } else {
      return "false";
    }
  });
  const [deleteEditPost, setDeleteEditPost] = useState({
    index: -1,
    post: {},
    edit: false,
  });
  const [refreshPost, setRefreshPost] = useState(false); // 當對貼文做出任何舉動時要刷新貼文
  // const [moreData, setMoreData] = useState(false);

  // URL更改時要改變isNeed變數
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
        setIsMapPop(false); // 隱藏選擇地圖
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

  // 監聽下滑更新貼文 一次加載五篇貼文
  useEffect(() => {
    const sleep = async (ms) => {
      return new Promise((r) => setTimeout(r, ms));
    };
    const getPost = async () => {
      const res = await apis.PostApi.getLimitPosts(
        postType.id,
        isNeed,
        postOffset,
        5
      );
      res.data.length === 0 || res.data.length < 5
        ? setIsEmpty(true)
        : setIsEmpty(false);
      setPostList(postList.concat(res.data));
      setPostOffset(postList.length + res.data.length);
      return res.data;
    };
    const bottomGetPost = async () => {
      if (
        window.pageYOffset + window.innerHeight + 10 >=
        document.documentElement.scrollHeight
      ) {
        await getPost();
        await sleep(1000);
      }
    };

    window.addEventListener("scroll", bottomGetPost, false);
    return () => {
      window.removeEventListener("scroll", bottomGetPost);
    };
  }, [isNeed, postOffset, postType]);

  useEffect(() => {
    const getPost = async () => {
      const res = await apis.PostApi.getLimitPosts(
        postType.id,
        isNeed,
        postOffset,
        5
      );
      res.data.length === 0 || res.data.length < 5
        ? setIsEmpty(true)
        : setIsEmpty(false);
      setPostList(postList.concat(res.data));
      setPostOffset(postList.length + res.data.length);
      return res.data;
    };
    if (
      window.pageYOffset + window.innerHeight + 10 >=
      document.documentElement.scrollHeight
    ) {
      getPost();
    }
    return () => {};
  }, [postOffset]);

  // 當貼文類型、資續需求、是否刷新，這三種變數變換時，要刷新貼文
  useEffect(() => {
    // 一次加載五篇貼文
    const getLimitPosts = async () => {
      const res = await apis.PostApi.getLimitPosts(postType.id, isNeed, 0, 5);
      res.data.length === 0 || res.data.length < 5
        ? setIsEmpty(true)
        : setIsEmpty(false);
      setPostList(res.data);
      setPostOffset(res.data.length);
    };

    getLimitPosts();
    return () => {};
  }, [postType, isNeed, refreshPost]);

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
    <div className="home-info d-flex jc-between">
      {/* 左側選單 */}
      <LeftNavigation
        postType={postType}
        setpostType={setpostType}
        location={location}
      ></LeftNavigation>
      {/* 貼文內容 */}
      <InfoPost
        setTopStyle={setTopStyle}
        postList={postList}
        setShowDeleteEditPop={setShowDeleteEditPop}
        setDeleteEditPost={setDeleteEditPost}
        isEmpty={isEmpty}
        postType={postType}
        setShowPopPost={setShowPopPost}
        myInfo={myInfo}
        closePost={closePost}
      ></InfoPost>
      {/* 空白區域 */}
      <div className="info-space"></div>
      {/* 彈跳視窗主體 */}
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
        postType={postType}
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
