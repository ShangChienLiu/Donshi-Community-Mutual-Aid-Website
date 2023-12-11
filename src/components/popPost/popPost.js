import React, { useState, useEffect } from "react";

// component
import PopPostTop from "./popPostTop";
import PopPostBottom from "./popPostBottom";
import PopChooseTopic from "./popChooseChild/chooseTopic";
import PopChooseBegin from "./popChooseChild/chooseBegin";
import PopChooseEnd from "./popChooseChild/chooseEnd";
import PopChooseLoca from "./popChooseChild/chooseLoca";
import PopChooseImg from "./popChooseChild/chooseImg";

// API
import apis from "../../apis";

/**
 *
 * @param showPopPost 彈跳視窗主體是否出現
 * @param setShowPopPost 設定彈跳視窗主體是否出現
 * @param showMainPop 彈跳視窗-彈跳視窗-發布貼文區塊 是否出現
 * @param setShowMainPop 彈跳視窗-設定彈跳視窗-發布貼文區塊 是否出現
 * @param showChoosePop 彈跳視窗-貼文內容(時間、圖片、位址)選擇區塊 是否出現
 * @param setShowChoosePop 設定彈跳視窗-貼文內容(時間、圖片、位址)選擇區塊 是否出現
 * @param showDelEditPop 設定彈跳視窗-編輯刪除區塊 是否出現
 * @param setShowDelEditPop 彈跳視窗-編輯刪除區塊 是否出現
 * @param setRefreshPost 當對貼文做出任何舉動時設定是否要刷新貼文
 * @param refreshPost 當對貼文做出任何舉動時是否要刷新貼文
 * @param isNeed 貼文 資訊OR需求
 * @param myInfo user info
 * @param postType 貼文 類型(食衣住行)
 */
export default function PopPost({
  showPopPost,
  setShowPopPost,
  showMainPop,
  setShowMainPop,
  showChoosePop,
  setShowChoosePop,
  setRefreshPost,
  refreshPost,
  isNeed,
  myInfo,
  postType,
  deleteEditPost,
  setDeleteEditPost,
  editPostFromList,
  isMapPop,
  setIsMapPop,
}) {
  // pop state
  const [whichPopChoose, setWhichPopChoose] = useState(0); // 決定哪一個choose pop(選擇主題、時間、圖片...) 要出現
  const [chooseTitle, setChooseTitle] = useState("選擇主題"); // choose pop 貼文內容(時間、圖片、位址)選擇區塊 的標題

  // PO文 state
  const [userInfo, setUserInfo] = useState(myInfo); // PO文者
  const [postTitle, setPostTitle] = useState(""); // PO文 標題
  const [postContent, setPostContent] = useState(""); // PO文 內文
  const [begin, setBegin] = useState("永久"); // PO文 開始時間
  const [end, setEnd] = useState("永久"); // PO文 結束時間
  const [postTopic, setPostTopic] = useState({ id: 0, topicName: "選擇主題" }); // PO文 主題
  const [fileImgList, setFileImgList] = useState([]); // PO 文圖片
  const [postLocation, setPostLocation] = useState(null);

  // 關閉choose pop 開啟 main pop
  const setChildPopShow = () => {
    setShowChoosePop(0);
    setShowMainPop(1);
  };

  // 貼文內容(時間、圖片、位址)選擇區塊
  const popChooseList = [
    // 選擇主題pop
    <PopChooseTopic
      postType={deleteEditPost.edit ? deleteEditPost.post.type : postType}
      setPostTopic={setPostTopic}
      setShowChoosePop={setShowChoosePop}
      setShowMainPop={setShowMainPop}
    ></PopChooseTopic>,
    // 選擇開始時間pop
    <PopChooseBegin
      setShowChoosePop={setShowChoosePop}
      setShowMainPop={setShowMainPop}
      setBegin={setBegin}
    ></PopChooseBegin>,
    // 選擇結束時間pop
    <PopChooseEnd
      setShowChoosePop={setShowChoosePop}
      setShowMainPop={setShowMainPop}
      setEnd={setEnd}
    ></PopChooseEnd>,
    // 選擇圖片pop
    <PopChooseImg
      fileImgList={fileImgList}
      setFileImgList={setFileImgList}
      setChildPopShow={setChildPopShow}
      isEdit={deleteEditPost.edit}
    ></PopChooseImg>,
    // 選擇位址pop
    <PopChooseLoca setChildPopShow={setChildPopShow}></PopChooseLoca>,
  ];

  // 設定監聽網頁點擊reSet POP 內容
  useEffect(() => {
    function reSetPost(e) {
      const setContent = () => {
        setPostTopic({ id: 0, topicName: "選擇主題" });
        setBegin("永久");
        setEnd("永久");
        setPostTitle("");
        setPostContent("");
        setFileImgList([]);
        setPostLocation(null);
        // document.getElementById("postTextArea").textContent = "";
      };

      // 當滑鼠點擊deleteEditPop 外圍白框時 要消失
      if (e.target.id === "deleteEditPop") {
        setContent();
      }

      // 當滑鼠點擊popPost 外圍白框時 要消失
      if (e.target.id === "popPost") {
        setContent();
      }
    }

    document.addEventListener("click", reSetPost);

    return () => {
      document.removeEventListener("click", reSetPost);
    };
  }, []);

  useEffect(() => {
    if (deleteEditPost.edit) {
      setFileImgList(deleteEditPost.post.files);
      setUserInfo(deleteEditPost.post.user);
      setPostTopic(deleteEditPost.post.topic);
      setPostTitle(deleteEditPost.post.title);
      setBegin(
        deleteEditPost.post.startDate === null
          ? "永久"
          : deleteEditPost.post.startDate
      );
      setEnd(
        deleteEditPost.post.endDate === null
          ? "永久"
          : deleteEditPost.post.endDate
      );
      setPostContent(deleteEditPost.post.text);
      setPostLocation(
        deleteEditPost.post.latitude !== null &&
          deleteEditPost.post.longitude !== null
          ? {
              lat: deleteEditPost.post.latitude,
              lng: deleteEditPost.post.longitude,
            }
          : null
      );
      // document.getElementById("postTextArea").textContent = deleteEditPost.post.text;
    }
    return () => {};
  }, [deleteEditPost]);

  // 新增貼文到database
  const addNewPost = (e) => {
    const addNewPost = async (files, newPost) => {
      await apis.PostApi.addNewPost(files, newPost);
      setRefreshPost(!refreshPost);
      closePopPost(e);
    };
    const newPost = {
      user: myInfo,
      type: postType,
      topic: postTopic,
      title: postTitle,
      text: postContent,
      startDate: begin,
      endDate: end,
      isNeed: isNeed,
    };
    if (postLocation) {
      newPost.latitude = postLocation.lat;
      newPost.longitude = postLocation.lng;
    }
    addNewPost(fileImgList, newPost);
  };

  // 編輯貼文到database
  const editOldPost = (e) => {
    const updatePost = async (files, editPost) => {
      await apis.PostApi.updatePost(files, editPost);
      editPostFromList(deleteEditPost.index, editPost);
      setDeleteEditPost({ index: -1, post: {}, edit: false });
      closePopPost(e);
    };

    const editPost = deleteEditPost.post;
    editPost.topic = postTopic;
    editPost.title = postTitle;
    editPost.text = postContent;
    editPost.startDate = begin;
    editPost.endDate = end;
    editPost.files = [];
    if (postLocation) {
      editPost.latitude = postLocation.lat;
      editPost.longitude = postLocation.lng;
    }
    // editPost.files = [...fileImgList];
    // const editPost = {
    //   ...deleteEditPost.post,
    //   topic: postTopic,
    //   title: postTitle,
    //   text: postContent,
    //   startDate: begin,
    //   endDate: end,
    //   // files: fileImgList,
    // };
    // console.log("update");
    updatePost(fileImgList, editPost);
  };

  // 新增或編輯貼文 database
  const btAddOrEditPost = (e) => {
    e.preventDefault();
    // 如果沒有選擇主題或是沒有標題就不給發
    if (postTopic.id !== 0 && postTitle !== "") {
      deleteEditPost.edit ? editOldPost(e) : addNewPost(e);
    } else if (postTopic.id === 0) {
      alert("請選擇主題");
    } else if (postTitle === "") {
      alert("請填寫公告標題");
    }
  };

  // 關閉popPost
  const closePopPost = (e) => {
    setPostTopic({ id: 0, topicName: "選擇主題" });
    setBegin("永久");
    setEnd("永久");
    setPostTitle("");
    setPostContent("");
    setFileImgList([]);
    setPostLocation(null);
    // document.getElementById("postTextArea").textContent = "";

    setShowPopPost(0);
    setShowMainPop(1);
    setIsMapPop(false);
    setDeleteEditPost({ index: -1, post: {}, edit: false });
    document.body.style.overflow = ""; //出現滾動條
    document.removeEventListener("touchmove", e, false); //開啟頁面滑動
  };

  return (
    <form
      id="popPost"
      // style={topStyle}
      onSubmit={(e) => e.preventDefault()}
      className={`pop-post jc-center ai-center w-100 h-100
        ${showPopPost === 0 ? "" : "show-pop-post"}`}
    >
      <div className="pop-post-container d-flex bg-white ">
        {/* 彈跳視窗-發布貼文區 */}
        <div
          id="mainPop"
          className={`pop-post-main-content d-flex flex-col w-100 px-3 ${
            showMainPop === 0 ? "" : "show-child-pop"
          }`}
        >
          <div className="pop-post-title-container">
            <p className="pop-post-title fs-xl text-center m-0 py-3">
              發布貼文
            </p>
            <i
              className="iconfont icon-close fs-xl bg-primary p-1 text-gray-6"
              onClick={closePopPost}
            ></i>
          </div>

          <div className="pop-post-content py-2 d-flex flex-col">
            {/* 發布貼文區 灰線上方 */}
            <PopPostTop
              userInfo={deleteEditPost.edit ? userInfo : myInfo}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              setShowChoosePop={setShowChoosePop}
              setShowMainPop={setShowMainPop}
              setWhichPopChoose={setWhichPopChoose}
              setChooseTitle={setChooseTitle}
              postTopic={postTopic}
              begin={begin}
              end={end}
            ></PopPostTop>
            {/* 發布貼文區 灰線下方 */}
            <PopPostBottom
              postContent={postContent}
              setPostContent={setPostContent}
              setShowChoosePop={setShowChoosePop}
              setShowMainPop={setShowMainPop}
              setChooseTitle={setChooseTitle}
              setWhichPopChoose={setWhichPopChoose}
              begin={begin}
              end={end}
              btAddOrEditPost={btAddOrEditPost}
              isEdit={deleteEditPost.edit}
              fileImgList={fileImgList}
              setIsMapPop={setIsMapPop}
              postLocation={postLocation}
            ></PopPostBottom>
          </div>
        </div>

        {/* 彈跳視窗-選擇(圖片、時間、位址)區 */}
        <div
          id="choosePop"
          className={`pop-post-choose-content bg-white d-flex flex-col w-100 px-3 ${
            showChoosePop === 0 ? "" : "show-child-pop"
          }`}
        >
          <div className="pop-choose-title">
            <p className="pop-post-title fs-xl text-center m-0 py-3">
              {chooseTitle}
            </p>
            <i
              className="iconfont icon-leftarrow fs-xl bg-primary p-1 text-gray-6"
              onClick={setChildPopShow}
            ></i>
          </div>
          {/* 彈跳視窗-另開選擇區 */}
          {popChooseList[whichPopChoose]}
        </div>
      </div>
      {isMapPop ? (
        <PopChooseLoca
          setChildPopShow={setChildPopShow}
          setIsMapPop={setIsMapPop}
          setPostLocation={setPostLocation}
        ></PopChooseLoca>
      ) : (
        <></>
      )}
    </form>
  );
}
