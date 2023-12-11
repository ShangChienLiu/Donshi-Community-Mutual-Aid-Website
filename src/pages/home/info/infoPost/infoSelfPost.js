import React from "react";
import { Link } from "react-router-dom";
import Config from "../../../../Config";
const { BASEURL } = Config;

/**
 *
 * @param setTopStyle 設定彈跳視窗主體高度
 * @param setShowPopPost 設定彈跳視窗主體是否出現
 */
export default function InfoSelfPost({ myInfo, setShowPopPost, setTopStyle }) {
  // 點擊發布貼文要顯示彈跳視窗
  const showPopPost = () => {
    setTopStyle({ top: window.pageYOffset + "px" });
    setShowPopPost(1);
    let mo = function (e) {
      e.preventDefault();
    };
    document.body.style.overflow = "hidden"; //隱藏滾動條
    document.addEventListener("touchmove", mo, false); //禁止頁面滑動
  };

  return (
    <div className="info-self-post d-flex ai-center p-3">
      <Link to="/home/profile">
        <img
          className={"info-self-img mr-3"}
          src={
            myInfo.pictureUrl
              ? `${BASEURL}${myInfo.pictureUrl}`
              : require("../../../../assets/image/profile.png")
          }
          alt=""
        />
      </Link>

      <div
        className="info-self-input d-flex ai-center p-2 pl-3 fs-lg text-gray-6 bg-gray-3"
        onClick={showPopPost}
      >
        想公告什麼?
      </div>
    </div>
  );
}
