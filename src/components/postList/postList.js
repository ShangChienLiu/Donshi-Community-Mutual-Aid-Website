import React, {useState, useEffect} from "react";

import InfoPostChild from "./postChild/postChild";

import apis from "../../apis"

/**
 *
 * @param setShowPopPost 設定彈跳視窗主體是否出現
 * @param setShowDelEditPop 設定彈跳視窗-編輯刪除區塊是否出現
 * @param postList 貼文列表
 * @param isEmpty 是否get不到貼文了(資料庫空)
 * @param setTopStyle 設定彈跳視窗主體高度
 * @param myInfo 個人資訊
 * @param setSelfPostType 如果現在是profile頁面，就需要這個來設定當前顛即刪除的貼文type
 */
export default function InfoPostList({
  // setShowPopPost,
  setShowDeleteEditPop,
  setDeleteEditPost,
  postList,
  isEmpty,
  setTopStyle,
  myInfo,
  setSelfPostType,
  setSearchPostType,
  closePost,
}) {
  const [allUserNameList, setAllUserNameList] = useState([])
  // 滑到底部時 顯示貼文狀態
  const havePost = <div className="text-center fs-lg mt-2">還有貼文</div>; // 還有貼文狀態
  const nonePost = <div className="text-center fs-lg mt-2">沒有貼文</div>; // 沒有貼文狀態
  const loadingPost = <div className="text-center fs-lg mt-2">載入貼文中</div>; // 加載貼文中
  // 判斷貼文狀態
  const footer = () => {
    return isEmpty ? nonePost : loadingPost;
  };

  useEffect(() => {
    const getAllUserName = async () => {
      const res = await apis.UserApi.getAllusername();
      setAllUserNameList(res.data);
    };

    getAllUserName();
    return () => {
      
    }
  }, [])

  // useEffect(() => {
  //   let socket = null;
  //   const _onChange = (data) => {
  //     console.log("change");
  //     const result = MySocketFactory.preprocessData(data);
  //     console.log(result);
  //     const changePost = result.post;
  //     setPostList((prePostList) =>
  //       prePostList.map((postValue) =>
  //         changePost.id === postValue.id ? changePost : postValue
  //       )
  //     );
  //   };
  //   const startSocket = () => {
  //     try {
  //       console.log("socket on");
  //       socket = MySocketFactory.getSocket();
  //       socket.on("change", _onChange);
  //     } catch (error) {
  //       console.log("connect error");
  //       console.log(error);
  //     }
  //   };
  //   startSocket();
  //   return () => {
  //     console.log("app socket close");
  //     socket.off("change", _onChange);
  //     MySocketFactory.clearSocket();
  //   };
  // }, []);

  return (
    <div className="info-post-list w-100">
      {/* 判斷貼文列表是否為空 */}
      {postList.length === 0 || postList == null ? (
        footer()
      ) : (
        <div>
          <ul className="info-post-list-container p-0 m-0">
            {postList.map((post, index) => (
              // 每一篇貼文
              <InfoPostChild
                key={index}
                index={index}
                post={post}
                setShowDeleteEditPop={setShowDeleteEditPop}
                setDeleteEditPost={setDeleteEditPost}
                setTopStyle={setTopStyle}
                myInfo={myInfo}
                setSelfPostType={setSelfPostType}
                setSearchPostType={setSearchPostType}
                closePost={closePost}
                allUserNameList={allUserNameList}
              ></InfoPostChild>
            ))}
          </ul>
          {/* 貼文狀態顯示 */}
          {isEmpty ? nonePost : havePost}
        </div>
      )}
    </div>
  );
}
