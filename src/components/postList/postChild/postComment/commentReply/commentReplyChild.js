import React, { useState, useEffect } from "react";
import Config from "../../../../../Config";

// apis
import apis from "../../../../../apis";

const { BASEURL } = Config;

/**
 *
 * @param reply 單則回復
 */
export default function CommentReplyChild({ reply, myInfo }) {
  const [replySetActive, setReplySetActive] = useState(1);
  const [editActive, setEditActive] = useState(false);
  const [editReplyText, setEditReplyText] = useState("");

  useEffect(() => {
    setEditActive(false);
    setEditReplyText("");
    return () => {};
  }, [reply]);

  // 監聽網頁點擊 點擊取消comment 編輯刪除
  useEffect(() => {
    function changeReplySetActive(e) {
      if (e.target.id !== "replySetting" && e.target.id !== "replySettingIcon")
        setReplySetActive(1);
    }
    document.addEventListener("click", changeReplySetActive);
    return () => {
      document.removeEventListener("click", changeReplySetActive);
    };
  }, []);

  // 將unicode 轉成 字元 醬才可以輸入表情符號
  const unicodeToChar = (text) => {
    return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
    });
  };

  const countTwoDate = () => {
    const nowDate = new Date();
    const postDate = new Date(Date.parse(reply.updatedAt.replace(/-/g, "/")));
    const betweenDateMin = parseInt((nowDate - postDate) / (1000 * 60));
    const betweenDateHour = parseInt((nowDate - postDate) / (1000 * 60 * 60));
    const betweenDateDay = parseInt(
      (nowDate - postDate) / (1000 * 60 * 60 * 24)
    );
    if (betweenDateHour >= 24) {
      return betweenDateDay + "天前";
    } else if (betweenDateHour < 24 && betweenDateHour >= 1) {
      return betweenDateHour + "小時前";
    } else {
      if (betweenDateMin > 0) {
        return betweenDateMin + "分鐘前";
      } else {
        return "剛剛";
      }
    }
  };

  const deleteReply = (replyId) => {
    const deleteReply = async (replyId) => {
      await apis.ReplyApi.deleteReply(replyId);
    };

    deleteReply(replyId);
  };

  const editReply = (replyId) => {
    const editReply = async (replyId) => {
      await apis.ReplyApi.updateReply(replyId, editReplyText);
      closeEditForm();
    };
    editReply(replyId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editReply(reply.id);
  };

  const closeEditForm = () => {
    setEditActive(false);
    setEditReplyText("");
  };

  return (
    <li className="reply-child d-flex ai-start">
      <img
        className={"reply-child-self-img mr-2"}
        src={
          reply.user.pictureUrl
            ? `${BASEURL}${reply.user.pictureUrl}`
            : require("../../../../../assets/image/profile.png")
        }
        alt=""
      />
      <div className="reply-child-container ml-2 w-100">
        <div className="reply-child-main w-100 d-flex ai-center">
          <div className="reply-child-content bg-gray-3 py-2 px-3">
            <div className="reply-author fs-xs fw-bold">
              {reply.user.username}
            </div>
            <div
              className="reply-text mt-1"
              style={editActive ? { display: "none" } : { display: "block" }}
            >
              {unicodeToChar(reply.text)}
            </div>
            <form
              className="edit-reply ai-center w-100 bg-gray-3 p-2"
              onSubmit={handleSubmit}
              style={editActive ? { display: "flex" } : { display: "none" }}
            >
              <input
                className="edit-reply-input w-100 bg-gray-3 fs-md"
                type="text"
                placeholder="留言..."
                value={editReplyText}
                onChange={(e) => setEditReplyText(e.target.value)}
              ></input>
              <i
                className="icon-edit-reply iconfont icon-send fs-lgs text-blue-1"
                onClick={() => editReply(reply.id)}
              ></i>
              <i
                className="icon-close-edit iconfont icon-close fs-lgs text-red ml-2"
                onClick={closeEditForm}
              ></i>
            </form>
          </div>

          <div
            id={"replySetting"}
            className="reply-child-setting ml-1 d-flex ai-center jc-center"
            style={
              myInfo.role === 0 || myInfo.id === reply.user.id
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            <i
              id={"replySettingIcon"}
              className="icon-reply-child-setting iconfont icon-2601caidan2 fs-xl pt-1"
              onClick={() =>
                replySetActive === 0
                  ? setReplySetActive(1)
                  : setReplySetActive(0)
              }
            ></i>
          </div>

          <ul
            className={"comment-setting-choose-container text-center"}
            style={
              replySetActive === 0 ? { display: "block" } : { display: "none" }
            }
          >
            <li
              className={"comment-setting-choose-child p-1 fs-md"}
              onClick={() => deleteReply(reply.id)}
            >
              刪除
            </li>
            <li
              className={"comment-setting-choose-child p-1 fs-md"}
              onClick={() => setEditActive(true)}
            >
              編輯
            </li>
          </ul>
        </div>

        <div className="reply-child-info d-flex mt-2 ai-center">
          <p className="reply-child-time m-0 fs-xs text-gray">
            {countTwoDate()} 
          </p>
        </div>
      </div>
    </li>
  );
}
