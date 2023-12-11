import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const CLIENT_ID =
  "268004935802-o2jo15sv6lofc3rqg07lhodqfslv8jkp.apps.googleusercontent.com";

export default function GoogleBtn() {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const login = (response) => {
    console.log(response);
    if (response.accessToken) {
      setIsLogin(true);
      setAccessToken(response.accessToken);
    }
  };

  const logout = (response) => {
    setIsLogin(false);
    setAccessToken("");
  };

  const handleLoginFailure = (response) => {
    alert("Failed to log in");
  };

  const handleLogoutFailure = (response) => {
    alert("Failed to log in");
  };

  return (
    <div>
      {isLogin ? (
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={logout}
          onFailure={handleLogoutFailure}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login"
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy={"single_host_origin"}
          responseType="code,token"
        />
      )}
      {/* {accessToken ? (
        <h5>
          Your Access Token: <br />
          <br /> {accessToken}
        </h5>
      ) : null} */}
    </div>
  );
}
