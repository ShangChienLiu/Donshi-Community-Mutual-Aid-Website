import React from "react";

// components
import NavSettingSelf from "./navSettingSelf";
import NavSettingButton from "./navSettingButton/navSettingButton";

/**
 * 上方bar 設定區域
 * @param myInfo 自己帳戶資訊
 * @param location URL 資訊
 */
export default function NavSetting({
  notiList,
  myInfo,
  location,
  setIsLogin,
  postType,
  setCloseTypePost,
  closePost,
  setNotiPostId
}) {
  return (
    <div className="nav-setting-container d-flex ai-center jc-end flex-1">
      {/* setting profile */}
      <NavSettingSelf myInfo={myInfo} location={location}></NavSettingSelf>

      {/* setting button  */}
      <NavSettingButton
        notiList={notiList}
        myInfo={myInfo}
        setIsLogin={setIsLogin}
        location={location}
        postType={postType}
        setCloseTypePost={setCloseTypePost}
        closePost={closePost}
        setNotiPostId={setNotiPostId}
      ></NavSettingButton>
    </div>
  );
}
