import React from "react";

// componenet
import ImageGridList from "../ImgGrid/ImageGridList";

/**
 *
 * @param postContent user info
 * @param setPostContent PO文 標題
 * @param setShowChoosePop 設定彈跳視窗-貼文內容(時間、圖片、位址)選擇區塊 是否出現
 * @param setShowMainPop 彈跳視窗-設定彈跳視窗-發布貼文區塊 是否出現
 * @param setWhichPopChoose 決定哪一個choose pop(選擇主題、時間、圖片...) 要出現
 * @param setChooseTitle 設定choose pop 貼文內容(時間、圖片、位址)選擇區塊 的標題
 * @param begin PO文 開始時間
 * @param end PO文 結束時間
 * @param btAddOrEditPost 發布或編輯貼文事件
 * @param previewImgList PO文 預覽圖片
 */
export default function PopPostBottom({
  postContent,
  setPostContent,
  setShowChoosePop,
  setShowMainPop,
  setWhichPopChoose,
  setChooseTitle,
  begin,
  end,
  btAddOrEditPost,
  fileImgList,
  isEdit,
  setIsMapPop,
  postLocation,
}) {
  // Main pop 底部選擇貼文內容區塊
  const chooseList = [
    {
      name: "公告開始時間",
      color: "blue",
      icon: "clock",
      content: `: ${begin}`,
    },
    {
      name: "公告結束時間",
      color: "yellow",
      icon: "clock",
      content: `: ${end}`,
    },
    {
      name: "圖片",
      color: "green",
      icon: "image",
      content: "",
    },
    {
      name: "定位",
      color: "pink",
      icon: "location",
      content: `: ${postLocation ? "完成" : ""}`,
    },
  ];

  // 設定哪一個貼文內容選擇pop要出現
  const setChildPopShow = (name, index) => {
    // 如果為地圖，就不要開啟Choose Pop
    if (index === 3) {
      setIsMapPop(true);
      setShowMainPop(0);
      return;
    }
    setWhichPopChoose(index + 1); // 設定哪一個Choose pop 出現
    setChooseTitle(name); // Choose pop title
    setShowChoosePop(1); // Choose pop close
    setShowMainPop(0); // Main pop close
  };

  return (
    <div className="pop-post-bottom-content d-flex flex-col">
      {/* PO文 內容 */}
      <div className="pop-bottom-text-container py-2">
        {/* <div
          id={"postTextArea"}
          className={"pop-bottom-text w-100 fs-lgs"}
          contentEditable="true"
          data-placeholder="想說什麼...."
          onInput={(event) => setPostContent(event.target.textContent)}
        ></div> */}

        <div className={"pop-bottom-text-parent"}>
          <div id={"postArea"} className={"dummy"}>
            {postContent}
          </div>
          <textarea
            id="textarea"
            className={"pop-bottom-text w-100 fs-lgs"}
            placeholder="想公告什麼......?"
            value={postContent}
            onChange={(event) => setPostContent(event.target.value)}
          ></textarea>
        </div>
      </div>

      <ImageGridList fileImgList={fileImgList} isPost={false}></ImageGridList>

      {/* PO 文 內容選擇 */}
      <div className="pop-post-choose">
        <ul className="pop-choose-list m-0 p-0">
          {chooseList.map((choose, index) => (
            <li
              className="d-flex py-2 ai-center pop-choose-child px-2"
              key={index}
              onClick={() => setChildPopShow(choose.name, index)}
            >
              <i
                className={`choose-child-icon iconfont icon-${choose.icon} fs-xl text-${choose.color} mr-1 mt-1`}
              ></i>
              <p className="choose-child-name m-0 fs-lg">
                {choose.name} {choose.content}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* 發布按鈕 */}
      <button
        className="bt-post-save my-2 py-2 fs-lgs bg-blue text-white fw-bold"
        onClick={btAddOrEditPost}
      >
        發佈
      </button>
    </div>
  );
}
