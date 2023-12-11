import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router";

// components
import Register from "./register";

// apis
import apis from "../../apis";

const CLIENT_ID =
  "268004935802-o2jo15sv6lofc3rqg07lhodqfslv8jkp.apps.googleusercontent.com";

export default function Login({ setIsLogin }) {
  const history = useHistory();
  const [isRegister, setIsRegister] = useState(false);
  const [myInfo, setMyInfo] = useState(null);

  const googleLogin = async (googleIdToken, account) => {
    const isExist = await apis.UserApi.checkExist(account);
    if (isExist.data.txt === "NULL") {
      const registerUser = {
        account: account,
        username: "",
        gender: "",
        birthday: "",
        introduction: "",
        phone: "",
      };
      const registerRes = await apis.UserApi.register(
        registerUser,
        null,
        googleIdToken
      );
      localStorage.token = registerRes.data.token;
      const userRes = await apis.UserApi.getUser();
      setMyInfo(userRes.data);
      setIsRegister(true);
    } else {
      const res = await apis.UserApi.googleLogin(googleIdToken);
      if (res.data.success) {
        localStorage.token = res.data.token;
        setIsLogin(true);
        history.push({
          pathname: "/home",
        });
      }
    }
  };

  const login = (response) => {
    if (response.tokenId) {
      googleLogin(response.tokenId, response.profileObj.email);
    }
  };

  const handleLoginFailure = (response) => {
    console.log(response);
    alert("登入失敗");
  };

  return (
    <div>
      {!isRegister ? (
        <div className="login d-flex flex-col jc-center ai-center">
          <img
            className="login-logo-img"
            src={require("../../assets/image/logo.png")}
            alt=""
          />
          <p className="login-welcome fs-xxxl my-5">趕快登錄吧</p>
          <GoogleLogin
            className="login-google-login d-flex jc-center ai-center fs-xxl"
            clientId={CLIENT_ID}
            buttonText="登入"
            onSuccess={login}
            onFailure={handleLoginFailure}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
          />
        </div>
      ) : (
        // <Register account={account} googleIdToken={googleIdToken}></Register>
        <Register myInfo={myInfo}></Register>
      )}
    </div>
  );
}
