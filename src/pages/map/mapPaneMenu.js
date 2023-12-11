import React, { useState } from "react";

// components

export default function MapPaneMenu({ setIsNeed, setPostType }) {
  const [isNeedMenuTitle, setIsNeedMenuTitle] = useState({
    title: "資訊",
    img: "info.png",
  });
  const [typeMenuTitle, setTypeMenuTitle] = useState({
    title: "食",
    img: "first_menu_food.png",
  });
  const menuList = [
    {
      menuTitle: "資訊/需求",
      childList: [
        {
          title: "資訊",
          img: "info.png",
        },
        {
          title: "需求",
          img: "need.png",
        },
      ],
    },
    {
      menuTitle: "貼文類型",
      childList: [
        {
          title: "食",
          img: "first_menu_food.png",
        },
        {
          title: "衣",
          img: "first_menu_cloth.png",
        },
        {
          title: "住",
          img: "first_menu_home.png",
        },
        {
          title: "行",
          img: "first_menu_transportation.png",
        },
        {
          title: "育",
          img: "first_menu_education.png",
        },
        {
          title: "樂",
          img: "first_menu_entertainment.png",
        },
        {
          title: "醫療",
          img: "first_menu_health.png",
        },
      ],
    },
  ];

  const changeMarker = (menuIndex, child, index) => {
    if (menuIndex === 0) {
      setIsNeedMenuTitle({
        title: child.title,
        img: child.img,
      });
      index === 0 ? setIsNeed("false") : setIsNeed("true");
    } else {
      setTypeMenuTitle({ title: child.title, img: child.img });
      setPostType({ id: index + 1, typeName: child.title });
    }
  };

  return (
    <div className={"map-pane-menu"}>
      <div className="map-pane-menu-nav d-flex">
        {menuList.map((menu, menuIndex) => (
          <li
            key={menuIndex}
            className={"pane-menu-list flex-1 d-flex ai-center jc-center p-2"}
          >
            <img
              className={"menu-title-img"}
              src={require(`../../assets/image/${
                menuIndex === 0 ? isNeedMenuTitle.img : typeMenuTitle.img
              }`)}
              alt=""
            />
            <p className={"menu-title-text m-0 mx-3 fs-lg"}>
              {menuIndex === 0 ? isNeedMenuTitle.title : typeMenuTitle.title}
            </p>
            <i className={"iconfont icon-arrow pt-1 "}></i>

            <ul
              className={`menu-child-list m-0 p-0 ${
                menuIndex === 0 ? "menu-child-left" : "menu-child-right"
              }`}
            >
              {menu.childList.map((child, childIndex) => (
                <li
                  key={childIndex}
                  className="menu-child d-flex jc-around ai-center"
                  onClick={() => changeMarker(menuIndex, child, childIndex)}
                >
                  <img
                    className={"menu-child-img"}
                    src={require(`../../assets/image/${child.img}`)}
                    alt=""
                  />
                  <p className={"menu-child-title"}>{child.title}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </div>
    </div>
  );
}
