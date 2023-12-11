import React, { useState, useEffect } from "react";
import { useSocketIO } from "../../helper/useSocketio";

// components
import HideLeftNavigation from "../leftNavigation/leftNavigation";
import Search from "../searchPost/searchPost";
import NavSearch from "./navSearch/navSearch";
import NavMenu from "./navMenu/navMenu";
import NavSetting from "./navSetting/navSetting";

/**
 * 上方選單bar
 * @param myInfo 個人資訊物件
 * @param location URL 資訊
 * @param postType 目前文章類型物件 (食衣住行...)
 * @param setpostType 設定顯示文章類型物件
 *
 */
export default function TopNavigation({
  notiList,
  myInfo,
  location,
  postType,
  setpostType,
  setIsLogin,
  setCloseTypePost,
  closePost,
  setNotiPostId,
}) {
  const [leftMenuActive, setLeftMenuActive] = useState(0); // 設定左方選單開啟或關閉
  const [searchActive, setSearchActive] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // 監聽點擊網頁其他區域關閉左方選單
    function changeLeftMenuActive(e) {
      if (e.target.id !== "menu-more" && e.target.id !== "menu-more-img")
        setLeftMenuActive(0);
    }
    document.addEventListener("click", changeLeftMenuActive);
    return () => {
      document.addEventListener("click", changeLeftMenuActive);
    };
  }, []);

  // const [menuActive, setMenuActive] = useState(0);
  // const [selfActive, setSelfActive] = useState(0);
  // const [btActive, setBtActive] = useState(-1);

  // useEffect(() => {
  // console.log(location.pathname);
  // const pathArr = location.pathname.split("/");
  // const lastPathName = pathArr.pop();
  // lastPathName === "profile" ? setSelfActive(1) : setSelfActive(0);
  // if (lastPathName === "profile") setMenuActive(2);
  // if (lastPathName === "setting") setMenuActive(-1);
  // document.addEventListener("click", (e) => {
  //   for (let i = 0; i < navSettings.length; i++) {
  //     let flagCircle = e.target.id === navSettings[i].btId;
  //     let flagIcon = e.target.id === navSettings[i].icon;
  //     if (flagIcon || flagCircle) {
  //       setBtActive(i);
  //       break;
  //     } else {
  //       setBtActive(-1);
  //     }
  //   }
  // });
  // }, [location]);

  return (
    <div className="top-navigation">
      {/* 隱藏的查詢區 */}
      <Search
        myInfo={myInfo}
        location={location}
        searchActive={searchActive}
        setSearchActive={setSearchActive}
        searchText={searchText}
        setSearchText={setSearchText}
      ></Search>
      <div className="top-navigation-container bg-white px-3 w-100">
        {/* 隱藏的左方選單 */}
        <HideLeftNavigation
          postType={postType}
          setpostType={setpostType}
          leftMenuActive={leftMenuActive}
          location={location}
        ></HideLeftNavigation>
        <div className="container d-flex ai-center jc-between">
          {/* 上方 搜尋區域 */}
          <NavSearch
            setSearchActive={setSearchActive}
            setSearchText={setSearchText}
            searchText={searchText}
          ></NavSearch>

          {/* 上方 菜單區域 */}
          <NavMenu
            location={location}
            leftMenuActive={leftMenuActive}
            setLeftMenuActive={setLeftMenuActive}
          ></NavMenu>

          {/* 上方 設定區域 */}
          <NavSetting
            notiList={notiList}
            myInfo={myInfo}
            location={location}
            setIsLogin={setIsLogin}
            postType={postType}
            setCloseTypePost={setCloseTypePost}
            closePost={closePost}
            setNotiPostId={setNotiPostId}
          ></NavSetting>
        </div>
      </div>
    </div>
  );
}
