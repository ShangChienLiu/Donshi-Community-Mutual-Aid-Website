import React, { useState, useEffect } from "react";
import Config from "../../../../Config";

// componenet
import SelfInfoCard from "./selfInfoCard/selfIntroCard";

const { BASEURL } = Config;

export default function SelfIntro({ myInfo, postNum, setTopStyle, setShowSelfInfoEdit }) {

  const startEditSelfInfo = () => {
    setTopStyle({ top: window.pageYOffset + "px" });
    setShowSelfInfoEdit(true);
    let mo = function (e) {
      e.preventDefault();
    };
    document.body.style.overflow = "hidden"; //隱藏滾動條
    document.addEventListener("touchmove", mo, false); //禁止頁面滑動
  };

  return (
    <div className="self-intro d-flex jc-center p-4">
      <div className="self-intro-img-container mr-4 d-flex flex-col ai-center">
        <img
          className="intro-img"
          src={
            myInfo.pictureUrl
              ? `${BASEURL}${myInfo.pictureUrl}`
              : require("../../../../assets/image/profile.png")
          }
          alt=""
        />
        <button
          className="self-intro-edit mt-3 fs-lg py-2 px-3 d-flex jc-center"
          onClick={startEditSelfInfo}
        >
          編輯個人檔案
        </button>
        {/* <img className="intro-set-img" src="" alt="" /> */}
      </div>

      <div className="self-intro-content d-flex flex-col jc-end">
        <p className="intro-name d-flex fs-xxxl my-0">{myInfo.username}</p>
        <p className="intro-text fs-xl my-0 mt-4">{myInfo.introduction}</p>
        <SelfInfoCard myInfo={myInfo} postNum={postNum}></SelfInfoCard>
      </div>
    </div>
  );
}
