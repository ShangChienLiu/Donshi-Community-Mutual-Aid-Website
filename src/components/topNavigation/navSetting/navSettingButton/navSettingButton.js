import React, { useState, useEffect } from "react";

// apis
import apis from "../../../../apis";

// components
import NavSettingButtonList from "./settingButtonList";

export default function NavSettingButton({
  notiList,
  myInfo,
  setIsLogin,
  location,
  postType,
  closePost,
  setCloseTypePost,
  setNotiPostId
}) {
  const navSettings = [
    {
      btId: "setting-dashboard",
      icon: "icon-dashboard",
      margin: "mr-1",
    },
    {
      btId: "setting-notification",
      icon: "icon-notification",
      margin: "ml-1",
      notiList: [{}, {}, {}],
    },
    {
      btId: "setting-arrow",
      icon: "icon-arrow",
      margin: "ml-1",
      chooseList: [
        {
          title: myInfo.username,
          path: "/home/profile",
        },
        {
          icon: "icon-setting",
          title: "設定",
          path: "/home/setting",
        },
        {
          icon: "icon-logout",
          title: "登出",
          path: "/login",
        },
      ],
    },
  ];
  const [isProfile, setIsProfile] = useState(false);
  const [topicList, setTopicList] = useState([]);
  const [btActive, setBtActive] = useState(-1); // 判斷被點擊的按鈕 更換背景顏色

  // 監聽網頁點擊 點擊外圍 取消背景顏色
  useEffect(() => {
    function changebtActive(e) {
      if (
        e.target.id !== "settingBtn" &&
        e.target.id !== "settingIcon" &&
        e.target.id !== "choosePostContainer" &&
        e.target.id !== "choosePostText"
      )
        setBtActive(-1);
    }
    document.addEventListener("click", changebtActive);
    return () => {
      document.removeEventListener("click", changebtActive);
    };
  }, []);

  useEffect(() => {
    const getTopicsWithType = async () => {
      const res = await apis.TopicApi.getTopicsWithType(postType.id);
      setTopicList(res.data);
    };
    getTopicsWithType();
    return () => {};
  }, [postType]);

  useEffect(() => {
    const pathArr = location.pathname.split("/");
    const lastPathName = pathArr.pop();
    lastPathName === "profile" ? setIsProfile(true) : setIsProfile(false);
    return () => {};
  }, [location]);

  return (
    //  按鈕區
    <div className="button-list-container ml-2">
      <ul className="d-flex p-0 m-0">
        {isProfile
          ? navSettings
              .slice(1)
              .map((setting, index) => (
                <NavSettingButtonList
                  key={index}
                  setting={setting}
                  index={index}
                  btActive={btActive}
                  setBtActive={setBtActive}
                  setIsLogin={setIsLogin}
                  notiList={notiList}
                  setNotiPostId={setNotiPostId}
                  location={location}
                ></NavSettingButtonList>
              ))
          : navSettings.map((setting, index) => (
              // 設定區域 child Button List
              <NavSettingButtonList
                key={index}
                setting={setting}
                index={index}
                btActive={btActive}
                setBtActive={setBtActive}
                setIsLogin={setIsLogin}
                topicList={topicList}
                setCloseTypePost={setCloseTypePost}
                closePost={closePost}
                notiList={notiList}
                setNotiPostId={setNotiPostId}
                location={location}
              ></NavSettingButtonList>
            ))}
      </ul>
    </div>
  );
}
