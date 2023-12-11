import React from "react";
import { Link } from "react-router-dom";

/**
 * 左方選單 child
 * @param postType 目前文章類型物件 (食衣住行...)
 * @param setpostType 設定顯示文章類型物件
 * @param index 當前menu child index
 * @param choice 當前 menu child content
 * @param location URL 資訊 
 */
export default function LeftNavChild({
  postType,
  setpostType,
  index,
  choice,
  location,
}) {
  // 點擊 左方菜單 child 更換 URL
  const changePost = () => {
    const newUrl = location.pathname + choice.path;
    return newUrl;
  };
  return (
    // 點擊更換文章顯示類型
    <li
      className="side-menu-child px-2 py-1"
      onClick={() => {
        setpostType({id: index + 1, typeName: choice.title});
      }}
    >
      <Link to={changePost} className="">
        <div
          className={`side-menu-child-container d-flex ai-center px-2 py-2 
          ${postType.id - 1 === index ? choice.bgColor : "side-menu-child-normal"}`}
        >
          <img
            className="menu-child-img"
            src={require(`../../assets/image/${choice.img}`)}
            alt={choice.title}
          />
          <p className="menu-child-title my-0 ml-3 fs-lg">{choice.title}</p>
        </div>
      </Link>
    </li>
  );
}
