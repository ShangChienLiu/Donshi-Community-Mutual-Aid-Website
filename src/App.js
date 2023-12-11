import React, { useState } from "react";
import "./assets/iconfont/iconfont.css";
import "./assets/scss/style.scss";
import {
  HashRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// components
import Home from "./pages/home/home";
import Map from "./pages/map/map";
import Login from "./pages/sigIn_Up/login";

function App() {
  const [isLogin, setIsLogin] = useState(
    localStorage.token == null ||
      localStorage.token === "" ||
      localStorage.token === undefined
      ? false
      : true
  );

  return (
    <HashRouter>
      <div className="app">
        {/* <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/map" component={Map}></Route> */}

        {/* 判斷是否有token
              沒有 => 進入Login
              有 => 進入home
          */}
        {!isLogin ? (
          <Switch>
            <Route path="/login">
              <Login setIsLogin={setIsLogin}></Login>
            </Route>
            <Route path="/" render={() => <Redirect to="/login" />}></Route>
            <Route component={() => 404} />
          </Switch>
        ) : (
          <Switch>
            <Route
              path="/home"
              render={(props) => (
                <Home
                  {...props}
                  // myInfo={myInfo}
                  location={props.location}
                  setIsLogin={setIsLogin}
                />
              )}
            ></Route>
            <Route path="/login">
              <Login setIsLogin={setIsLogin}></Login>
            </Route>
            <Route path="/map" component={Map}></Route>
            <Route path="/" render={() => <Redirect to="/home" />}></Route>
            <Route component={() => 404} />
          </Switch>
          // <Route path="/" render={() => <Redirect to="/home" />}></Route>
        )}
        {/* <Route component={() => 404} />
        </Switch> */}
      </div>
    </HashRouter>
  );
}

export default App;
