import React from "react";
import { Link } from "react-router-dom";

/**
 * 上方選單 child
 * @param link child content
 * @param index child index
 * @param menuActive 判斷 是否被點擊要出現底線
 * @param leftMenuActive 目前左方選單開啟或關閉
 * @param setLeftMenuActive 設定左方選單開啟或關閉
 * @param location URL 資訊
 */
export default function NavMenuChild({
  link,
  index,
  menuActive,
  leftMenuActive,
  setLeftMenuActive,
  location,
}) {
  // const [moreActive, setMoreActive] = useState(1); 目前不用
  // 防止冒泡
  const stopPropagation = (e) => {
    e.nativeEvent.stopImmediatePropagation();
  };

  // useEffect(() => {
  //   document.addEventListener("click", () => setLeftMenuActive(0));
  //   return () => {
  //     document.removeEventListener("click", () => setLeftMenuActive(0));
  //   };
  // }, [setLeftMenuActive]);

  // useEffect(() => {
  //   const pathArr = location.pathname.split("/");
  //   const lastPathName = pathArr.pop();
  //   lastPathName === "info" || lastPathName === "need"
  //     ? setMoreActive(1)
  //     : setMoreActive(0);
  // }, [location]);
  return (
    <li
      title={link.title}
      className={`menu-child d-flex jc-center flex-1`}
      // className={`menu-child d-flex jc-center flex-1 ${
      //   moreActive === 0 && index === 3 ? "bt-more-hide" : ""
      // }`}
      onClick={index === 3 ? stopPropagation : null}
    >
      <div className="menu-child-bg"></div>
      {/* 第四個menu child 是控制左方滑動選單的 */}
      {index === 4 ? (
        <div
          id={"menu-more"}
          aria-label={link.title}
          className={`bt-more menu-child-link d-flex jc-center w-100 h-100 py-25`}
          onClick={() =>
            leftMenuActive === 0 ? setLeftMenuActive(1) : setLeftMenuActive(0)
          }
        >
          <img
            id={"menu-more-img"}
            className={"bt-more-img"}
            src={require(`../../../assets/image/${link.img}`)}
            alt={link.title}
          />
        </div>
      ) : (
        <Link
          aria-label={link.title}
          to={link.path}
          className="menu-child-link d-flex jc-center w-100 h-100 py-25"
          style={
            menuActive === index
              ? { borderBottom: `0.25rem ${link.lineColor} solid` }
              : {}
          }
          // onClick={() => setMenuActive(index)}
        >
          <img
            src={require(`../../../assets/image/${link.img}`)}
            alt={link.title}
          />
        </Link>
      )}

      {/* 觸碰會出現浮動解釋字串 */}
      <span className="menu-child-tip-text text-white bg-black p-2">
        {link.title}
      </span>
    </li>
  );
}
