import React, { useState, useEffect } from "react";
import NavMenuChild from "./navMenuChild";

// 上方 中央頁面選單
const navLinks = [
  {
    title: "資訊",
    img: "info.png",
    lineColor: "#26B6C3",
    path: "/home/info?topic=food",
  },
  {
    title: "需求",
    img: "need.png",
    lineColor: "#EF7577",
    path: "/home/need?topic=food",
  },
  {
    title: "地圖",
    img: "location.png",
    lineColor: "#EF7577",
    path: "/map",
  },
  {
    title: "個人",
    img: "profile.png",
    lineColor: "#7383BF",
    path: "/home/profile",
  },
  {
    title: "更多",
    img: "more.png",
    lineColor: "#3399FF",
    path: "",
  },
];

/**
 * 上方bar 菜單區域
 * @param location URL 資訊
 * @param leftMenuActive 目前左方選單開啟或關閉
 * @param setLeftMenuActive 設定左方選單開啟或關閉
 */
export default function NavMenu({
  location,
  leftMenuActive,
  setLeftMenuActive,
}) {
  const [menuActive, setMenuActive] = useState(0); // 判斷目前哪一個menu child被點擊到(加底色)

  // 當location 更新時 判斷是哪一個頁面 將對應的menu child 加底線
  useEffect(() => {
    const pathArr = location.pathname.split("/");
    const lastPathName = pathArr.pop();
    // 遍歷上方選單 看是哪個child 被選種
    navLinks.every((link, index) => {
      if (lastPathName === link.path.split("/").pop()) {
        setMenuActive(index);
        return false
      }

      // 這邊要防止 URL 有問號之類的
      if (index === 0 || index === 1) {
        const splitLinkPathName = link.path.split("/").pop().split("?")[0];
        if (lastPathName === splitLinkPathName) {
          setMenuActive(index);
          return false
        }
      }

      // 沒被選中的就是 -1
      setMenuActive(-1)
      return true
    });
  }, [location]);

  return (
    <div className="nav-menu-container d-flex jc-center">
      <ul className="menu d-flex jc-around p-0 m-0">
        {navLinks.map((link, index) => (
          // 上方 選單 child
          <NavMenuChild
            key={index}
            link={link}
            index={index}
            menuActive={menuActive}
            leftMenuActive={leftMenuActive}
            setLeftMenuActive={setLeftMenuActive}
            location={location}
          ></NavMenuChild>
        ))}
      </ul>
    </div>
  );
}
