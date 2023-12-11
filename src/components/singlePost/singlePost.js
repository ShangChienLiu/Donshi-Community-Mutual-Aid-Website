import React, { useState, useEffect } from "react";

// components
import InfoPostChild from "../postList/postChild/postChild";
import PopPost from "../popPost/popPost";
import DeleteEditPop from "../deleteEditPop/popDeleteEdit";

// apis
import apis from "../../apis";

export default function SinglePost({ myInfo, location, notiPostId }) {
  // 彈跳視窗 pop post state
  const [topStyle, setTopStyle] = useState({ top: window.pageYOffset + "px" }); // 彈跳視窗的絕對位置高度style
  const [showPopPost, setShowPopPost] = useState(0); // 設定彈跳視窗主體是否出現
  const [showMainPop, setShowMainPop] = useState(1); // 設定彈跳視窗-發布貼文區塊 是否出現
  const [isMapPop, setIsMapPop] = useState(false);
  const [showChoosePop, setShowChoosePop] = useState(0); // 設定彈跳視窗-貼文內容(時間、圖片、位址)選擇區塊 是否出現
  const [singlePostType, setSinglePostType] = useState({
    id: 1,
    typeName: "食",
  });
  // 編輯刪除彈跳視窗 state
  const [showDeleteEditPop, setShowDeleteEditPop] = useState(0);

  // 貼文列表state
  const [singlePost, setSinglePost] = useState();
  const [isNeed, setIsNeed] = useState("false");
  const [deleteEditPost, setDeleteEditPost] = useState({
    index: -1,
    post: {},
    edit: false,
  });
  const [refreshPost, setRefreshPost] = useState(false); // 當對貼文做出任何舉動時要刷新貼文
  const [allUserNameList, setAllUserNameList] = useState([]);

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

  useEffect(() => {
    const getAllUserName = async () => {
      const res = await apis.UserApi.getAllusername();
      setAllUserNameList(res.data);
    };

    const getSinglePost = async () => {
      const res = await apis.PostApi.getById(notiPostId);
      setSinglePost(res.data);
    };

    getAllUserName();
    getSinglePost();
    return () => {};
  }, []);

  // UI刪除貼文 不是資料庫
  const deletePostFromList = (index) => {
    if (index > -1) {
      setSinglePost(null);
    }
  };

  // UI編輯貼文 不是資料庫
  const editPostFromList = (index, post) => {
    if (index > -1) {
      setSinglePost(null);
    }
  };

  return (
    <div className={`single-post d-flex jc-center py-4`}>
      {singlePost ? (
        <div className="info-post-list">
          <div className="info-post-list-container">
            <InfoPostChild
              post={singlePost}
              setShowDeleteEditPop={setShowDeleteEditPop}
              setDeleteEditPost={setDeleteEditPost}
              setTopStyle={setTopStyle}
              myInfo={myInfo}
              closePost={[]}
              allUserNameList={allUserNameList}
              setSinglePostType={setSinglePostType}
            ></InfoPostChild>
          </div>
        </div>
      ) : (
        <div>沒有貼文</div>
      )}
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
        postType={singlePostType}
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
