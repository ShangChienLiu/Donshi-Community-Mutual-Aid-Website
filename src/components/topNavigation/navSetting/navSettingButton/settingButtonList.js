import React from "react";

// components
import NavSettingButtonChild from "./settingButtonChild";
import ChooseTypeChild from "./chooseTypeChild";
import Notification from "./notification";

/**
 * 上方bar 設定主要按鈕區域
 * @param setting 按鈕List content
 * @param index 按鈕index
 * @param btActive 按鈕是否被點擊
 * @param setBtActive 設定按鈕是否被點擊
 */
export default function SettingButtonList({
  setting,
  index,
  btActive,
  setBtActive,
  setIsLogin,
  topicList,
  setCloseTypePost,
  closePost,
  notiList,
  setNotiPostId,
  location,
}) {
  return (
    // 設定按鈕樣式
    <li
      className={`
      ${btActive === index ? "bg-blue-2" : "bg-gray-1"}
      ${setting.margin} 
      bt-circle mr-1 d-flex ai-center jc-center`}
      key={index}
      id="settingBtn"
      onClick={() =>
        btActive === index ? setBtActive(-1) : setBtActive(index)
      }
    >
      <i
        id="settingIcon"
        className={`
        ${setting.icon} 
        ${btActive === index ? "text-blue-1" : ""}
        iconfont fs-xl`}
      ></i>

      {/* 設定的下拉選單 */}
      {setting.chooseList === undefined && setting.notiList === undefined ? (
        <ul
          id={"choosePostContainer"}
          className="button-choose-container d-flex flex-col p-2"
          style={btActive === index ? { display: "flex" } : { display: "none" }}
          onClick={(e) => e.stopPropagation()}
        >
          {topicList.map((topic, index) => (
            <ChooseTypeChild
              key={index}
              index={index}
              topic={topic}
              closePost={closePost}
              setCloseTypePost={setCloseTypePost}
            ></ChooseTypeChild>
          ))}
        </ul>
      ) : setting.chooseList === undefined ? (
        <ul
          className="button-choose-container d-flex flex-col p-0"
          style={btActive === index ? { display: "flex" } : { display: "none" }}
        >
          {notiList.length > 0 ? (
            notiList.map((noti, index) => (
              // 下拉選單
              <Notification
                key={index}
                noti={noti}
                setNotiPostId={setNotiPostId}
                location={location}
              ></Notification>
            ))
          ) : (
            <div className={"p-3 text-center"}>沒有通知</div>
          )}
        </ul>
      ) : (
        <ul
          className="button-choose-container d-flex flex-col p-0"
          style={btActive === index ? { display: "flex" } : { display: "none" }}
        >
          {setting.chooseList.map((choose, index) => (
            // 下拉選單
            <NavSettingButtonChild
              key={index}
              choose={choose}
              index={index}
              setIsLogin={setIsLogin}
            ></NavSettingButtonChild>
          ))}
        </ul>
      )}
    </li>
  );
}
