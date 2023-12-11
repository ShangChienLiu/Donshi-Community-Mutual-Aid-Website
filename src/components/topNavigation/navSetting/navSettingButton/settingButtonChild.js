import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

const CLIENT_ID =
  "268004935802-o2jo15sv6lofc3rqg07lhodqfslv8jkp.apps.googleusercontent.com";

/**
 *
 * @param choose child menu content
 * @param index child menu index
 */
export default function SettingButtonChild({ choose, index, setIsLogin }) {
  const logout = (response) => {
    localStorage.token = "";
    setIsLogin(false);
    console.log("logout");
    console.log(localStorage.token);
  };

  const handleLogoutFailure = (response) => {
    alert("登出失敗");
  };

  return (
    <li className="d-flex button-choose-child py-2 px-2">
      {index === 0 ? (
        // 選單第一個為個人頁面 樣式不一樣
        <Link
          to={choose.path}
          className="choose-self-container d-flex ai-center jc-start p-2 w-100"
        >
          <img
            className="mr-1"
            src={require("../../../../assets/image/logo_pure.png")}
            alt=""
          />
          <p className="m-0 fs-lg">{choose.title}</p>
        </Link>
      ) : (
        // 之後的選單就正常
        <Link
          to={choose.path}
          className={`choose-child-container d-flex ai-center jc-start px-2 w-100 ${
            index === 2 ? "" : "py-3"
          }`}
        >
          <i className={`iconfont ${choose.icon}  fs-xlx mr-2 `}></i>
          {index === 2 ? (
            <GoogleLogout
              className={"google-logout"}
              clientId={CLIENT_ID}
              buttonText="登出"
              onLogoutSuccess={logout}
              onFailure={handleLogoutFailure}
            ></GoogleLogout>
          ) : (
            <p className="m-0 fs-lg">{choose.title}</p>
          )}
        </Link>
      )}
    </li>
  );
}
