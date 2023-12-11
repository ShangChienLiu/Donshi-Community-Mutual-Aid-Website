import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Config from "../../../Config";
const { BASEURL } = Config;

/**
 * setting選單 帳戶區域
 * @param myInfo 自己帳戶資訊
 * @param location URL 資訊
 */
export default function NavSettingSelf({ myInfo, location }) {
  const [selfActive, setSelfActive] = useState(0); // 判斷當前頁面是不是個人頁面 是的話更換背景顏色

  useEffect(() => {
    const pathArr = location.pathname.split("/");
    const lastPathName = pathArr.pop();
    lastPathName === "profile" ? setSelfActive(1) : setSelfActive(0);
  }, [location]);

  return (
    <Link
      to="/home/profile"
      className={`
      ${selfActive === 1 ? "bg-blue-2" : ""} 
      self d-flex ai-center p-1`}
    >
      <img
        className={"self-img"}
        src={
          myInfo.pictureUrl
            ? `${BASEURL}${myInfo.pictureUrl}`
            : require("../../../assets/image/profile.png")
        }
        alt="self img"
      />
      <p
        className={`
        ${selfActive === 1 ? "text-blue-1" : ""}  
        self-name fs-lgs m-0 ml-2`}
      >
        {myInfo.username}
      </p>
    </Link>
  );
}
