import React from "react";
import Config from "../../Config";
const { BASEURL } = Config;

/**
 *
 * @param myInfo user info
 * @param postTitle PO文 標題
 * @param setPostTitle 設定PO 文標題
 * @param setShowChoosePop 設定彈跳視窗-貼文內容(時間、圖片、位址)選擇區塊 是否出現
 * @param setShowMainPop 彈跳視窗-設定彈跳視窗-發布貼文區塊 是否出現
 * @param setWhichPopChoose 決定哪一個choose pop(選擇主題、時間、圖片...) 要出現
 * @param setChooseTitle 設定choose pop 貼文內容(時間、圖片、位址)選擇區塊 的標題
 * @param postTopic PO文 主題
 * @param begin PO文 開始時間
 * @param end PO文 結束時間
 */
export default function PopPostTop({
  userInfo,
  postTitle,
  setPostTitle,
  setShowChoosePop,
  setShowMainPop,
  setWhichPopChoose,
  setChooseTitle,
  postTopic,
  begin,
  end,
}) {
  const setChildPopShow = () => {
    setWhichPopChoose(0); // 設定目前為 "選擇主題 pop" 出現
    setShowChoosePop(1); // 設定choose pop出現
    setShowMainPop(0); // 設定Main pop 消失
    setChooseTitle("選擇主題"); // 設定choose pop 標題
  };

  return (
    <div className="pop-post-top-content d-flex flex-col">
      <div className="pop-top-self d-flex ai-center mb-3">
        {/* user 大頭貼 */}
        <img
          className="pop-top-self-img mr-2"
          src={userInfo.pictureUrl
            ? `${BASEURL}${userInfo.pictureUrl}`
            : require("../../assets/image/profile.png")}
          alt=""
        />

        {/* 貼文資訊--(user姓名、開始時間、結束時間) */}
        <div className="pop-top-self-info flex-1">
          <p className="pop-top-self-name m-0 pb-1">{userInfo.username}</p>
          <p className="pop-top-self-time m-0">
            {begin}~{end}
          </p>
        </div>

        {/* 選擇PO 文主題 */}
        <div
          className="pop-top-choose p-2 fs-lgs bg-gray-5 text-dark-green"
          onClick={setChildPopShow}
        >
          {postTopic.topicName}
        </div>
      </div>

      {/* 設定PO文 標題 */}
      <input
        type="text"
        className="pop-top-title fs-lgs pb-2"
        placeholder="公告標題"
        value={postTitle}
        onChange={(event) => setPostTitle(event.target.value)}
      ></input>
    </div>
  );
}
