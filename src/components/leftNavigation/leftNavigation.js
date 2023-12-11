import React from "react";

// components
import LeftNavChild from "./leftNavChild";

// 更改path 變成可依照info、need、profile 來變化
// 左方選單內容陣列
const navMenu = [
  // {
  //   title: "Name",
  //   img: "logo_pure.png",
  //   path: "/home/profile",
  // },
  {
    title: "食",
    img: "first_menu_food.png",
    path: "?topic=food",
    bgColor: "bg-pink-1",
  },
  {
    title: "衣",
    img: "first_menu_cloth.png",
    path: "?topic=cloth",
    bgColor: "bg-green",
  },
  {
    title: "住",
    img: "first_menu_home.png",
    path: "?topic=home",
    bgColor: "bg-brown",
  },
  {
    title: "行",
    img: "first_menu_transportation.png",
    path: "?topic=transportation",
    bgColor: "bg-blue-3",
  },
  {
    title: "育",
    img: "first_menu_education.png",
    path: "?topic=education",
    bgColor: "bg-yellow-1",
  },
  {
    title: "樂",
    img: "first_menu_entertainment.png",
    path: "?topic=entertainment",
    bgColor: "bg-purple",
  },
  {
    title: "醫療長照",
    img: "first_menu_health.png",
    path: "?topic=health",
    bgColor: "bg-orange",
  },
];
/**
 * 左方選單
 * @param postType 目前文章類型物件 (食衣住行...)
 * @param setpostType 設定顯示文章類型物件
 * @param leftMenuActive 左方選單開啟或關閉
 * @param location URL 資訊
 *   
 */
export default function LeftNavigation({
  postType,
  setpostType,
  leftMenuActive,
  location,
}) {
  return (
    <div
      className={`left-navigation ${leftMenuActive === 0 ? "" : "left-open"}`}
    >
      <ul className="side-menu-container p-0 pl-1 pt-2 m-0">
        {navMenu.map((choice, index) => (
          // 左方 menu child
          <LeftNavChild
            key={index}
            postType={postType}
            setpostType={setpostType}
            index={index}
            choice={choice}
            location={location}
          ></LeftNavChild>
        ))}
      </ul>
    </div>
  );
}
