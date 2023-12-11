import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MySocketFactory from "../../helper/socketio";

// component
import TopNavigation from "../../components/topNavigation/topNavigation";
import Info from "./info/info";
import Need from "./need/need";
import Profile from "./profile/profile";
import Setting from "./setting/setting";
import SinglePost from "../../components/singlePost/singlePost";

// apis
import apis from "../../apis";

//

export default function Home({ location, setIsLogin }) {
  const [postType, setPostType] = useState({ id: 1, typeName: "食" }); // 七種文章類型物件: 食衣住行...
  const [myInfo, setMyInfo] = useState({}); // 自己的帳戶資訊物件
  const [closePost, setCloseTypePost] = useState([]);
  const [notiList, setNotiList] = useState([]);
  const [notiPostId, setNotiPostId] = useState(null);

  useEffect(() => {
    let socket = null;
    const _onChangeInApp = (data) => {
      console.log("_onChangeInApp");
      const result = MySocketFactory.preprocessData(data);
      const changePost = result.post;
      const changeComment = result.comment;
      if (result.action === "ADD") {
        if (
          changePost.userId === myInfo.id &&
          changeComment.user.id !== myInfo.id
        ) {
          let notiName = changeComment.user.username;
          let notiTitle = "已回覆您的貼文";
          let notiText = changeComment.text;
          setNotiList((preNotiList) =>
            preNotiList.concat({
              post: changePost,
              name: notiName,
              title: notiTitle,
              text: notiText,
            })
          );
        }
        let commentText = changeComment.text;
        while (commentText.includes(`<font color="#FE2026" id="`)) {
          const startTag = commentText.indexOf(`<font color="#FE2026" id="`);
          const endTag = commentText.indexOf(`</font>`);
          const tagHTML = commentText.substring(startTag, endTag + 7);

          const startUserId = tagHTML.indexOf(`id="`);
          const endUserId = tagHTML.indexOf(`">`);
          const userId = commentText.substring(startUserId + 4, endUserId);

          if (userId === myInfo.id) {
            let notiName = changeComment.user.username;
            let notiTitle = "已標記您";
            let notiText = changeComment.text;
            setNotiList((preNotiList) =>
              preNotiList.concat({
                post: changePost,
                name: notiName,
                title: notiTitle,
                text: notiText,
              })
            );
          }
          commentText = commentText.replace(tagHTML, "");
        }
      }
    };
    try {
      socket = MySocketFactory.getSocket();
      socket.on("change", _onChangeInApp);
    } catch (error) {
      alert(error);
    }
    return () => {
      if (socket) socket.off("change", _onChangeInApp);
    };
  }, [myInfo]);

  useEffect(() => {
    console.log(notiList);
    return () => {};
  }, [notiList]);

  useEffect(() => {
    // 取得自己的帳戶資訊
    const getMyInfo = async () => {
      const res = await apis.UserApi.getUser();
      setMyInfo(res.data);
    };

    // // 取得七種文章類型
    // const getTypeAll = async () => {
    //   const res = await apis.TypeApi.getTypes();
    //   setPostType(res.data[0]);
    // };

    getMyInfo(); // 取得自己的帳戶資訊
    // getTypeAll(); // 取得七種文章類型
    return () => {
      console.log("app socket close");
      MySocketFactory.clearSocket();
    };
  }, []);

  return (
    <div className="home">
      {/* 上方選單bar */}
      <TopNavigation
        notiList={notiList}
        myInfo={myInfo}
        location={location}
        postType={postType}
        setpostType={setPostType}
        setIsLogin={setIsLogin}
        closePost={closePost}
        setCloseTypePost={setCloseTypePost}
        setNotiPostId={setNotiPostId}
      ></TopNavigation>

      {/* 空格 */}
      <div className="d-flex mt-6"></div>

      <Switch>
        {/* 路徑: 資訊頁面 */}
        <Route path="/home/info">
          <Info
            myInfo={myInfo}
            postType={postType}
            setpostType={setPostType}
            location={location}
            closePost={closePost}
          ></Info>
        </Route>
        {/* 路徑: 需求頁面 */}
        <Route path="/home/Need">
          <Need
            myInfo={myInfo}
            postType={postType}
            setpostType={setPostType}
            location={location}
            closePost={closePost}
          ></Need>
        </Route>
        {/* 路徑: 個人頁面 */}
        <Route path="/home/profile">
          <Profile setMyInfo={setMyInfo} myInfo={myInfo}></Profile>
        </Route>
        {/* 路徑: 設定頁面 */}
        <Route path="/home/setting">
          <Setting myInfo={myInfo}></Setting>
        </Route>
        {/* 路徑: 設定頁面 */}
        <Route path="/home/post">
          <SinglePost
            myInfo={myInfo}
            location={location}
            notiPostId={notiPostId}
          ></SinglePost>
        </Route>
        {/* 路徑: 直接導向頁面 */}
        <Route
          path="/home"
          render={() => <Redirect to="/home/info?topic=food" />}
        ></Route>
      </Switch>
    </div>
  );
}
