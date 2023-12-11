import React, { useState, useEffect } from "react";
import Config from "../../../../Config";

// component
import CommentReplyList from "./commentReply/commentReplyList";

// apis
import apis from "../../../../apis";

const { BASEURL } = Config;

/**
 *
 * @param comment 單則留言
 */
export default function PostCommentChild({ comment, myInfo }) {
  const [replyActive, setReplyActive] = useState(1);
  const [commentSetActive, setCommentSetActive] = useState(1);
  const [editActive, setEditActive] = useState(false);
  const [editCommentText, setEditCommentText] = useState("");

  useEffect(() => {
    setEditActive(false);
    setEditCommentText("");
    return () => {};
  }, [comment]);

  // 監聽網頁點擊 點擊取消comment 編輯刪除
  useEffect(() => {
    setReplyActive(1);
    setCommentSetActive(1);
    setEditActive(false);
    function changeCommentSetActive(e) {
      if (
        e.target.id !== "commentSetting" &&
        e.target.id !== "commentSettingIcon"
      )
        setCommentSetActive(1);
    }
    document.addEventListener("click", changeCommentSetActive);
    return () => {
      document.removeEventListener("click", changeCommentSetActive);
    };
  }, []);

  // 將unicode 轉成 字元 醬才可以輸入表情符號
  const unicodeToChar = (text) => {
    return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
    });
  };

  const judgeTagName = (text) => {
    if (text.indexOf("<font") > -1) {
      console.log(text);
      const tagStart = text.indexOf("<font");
      const tagEnd = text.indexOf("</font>") + 6;
      console.log(tagStart);
      console.log(tagEnd);
    }
    return text;
  };

  const countTwoDate = () => {
    const nowDate = new Date();
    const postDate = new Date(Date.parse(comment.updatedAt.replace(/-/g, "/")));
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

  const deleteComment = (commentId) => {
    const deleteComment = async (commentId) => {
      await apis.CommentApi.deleteComment(commentId);
      // deleteCommentFromList(index);
    };

    deleteComment(commentId);
  };

  const editComment = (commentId) => {
    const editComment = async (commentId) => {
      await apis.CommentApi.updateComment(commentId, editCommentText);
      closeEditForm();
    };
    editComment(commentId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editComment(comment.id);
  };

  const closeEditForm = () => {
    setEditActive(false);
    setEditCommentText("");
  };

  return (
    <li className="post-comment-child d-flex ai-start mt-3">
      <img
        className={"comment-child-self-img"}
        src={
          comment.user.pictureUrl
            ? `${BASEURL}${comment.user.pictureUrl}`
            : require("../../../../assets/image/profile.png")
        }
        alt=""
      />
      <div className={"comment-child w-100"}>
        <div className="comment-child-container ml-2 ">
          <div className="comment-child-main d-flex ai-center">
            <div className="comment-child-content bg-gray-3 py-2 px-3">
              <div className="comment-author fs-xs fw-bold">
                {comment.user.username}
              </div>
              <div
                className="comment-text mt-1"
                dangerouslySetInnerHTML={{ __html: comment.text }}
                style={editActive ? { display: "none" } : { display: "block" }}
              ></div>
              <form
                className="edit-comment ai-center w-100 bg-gray-3 p-2"
                onSubmit={handleSubmit}
                style={editActive ? { display: "flex" } : { display: "none" }}
              >
                <input
                  className="edit-comment-input w-100 bg-gray-3 fs-md"
                  type="text"
                  placeholder="留言..."
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                ></input>
                <i
                  className="icon-edit-comment iconfont icon-send fs-lgs text-blue-1"
                  onClick={() => editComment(comment.id)}
                ></i>
                <i
                  className="icon-close-edit iconfont icon-close fs-lgs text-red ml-2"
                  onClick={closeEditForm}
                ></i>
              </form>
            </div>

            <div
              id={"commentSetting"}
              className={`comment-child-setting ml-1 d-flex ai-center jc-center`}
              style={
                myInfo.role === 0 || myInfo.id === comment.user.id
                  ? { display: "flex" }
                  : { display: "none" }
              }
              onClick={() =>
                commentSetActive === 0
                  ? setCommentSetActive(1)
                  : setCommentSetActive(0)
              }
            >
              <i
                id={"commentSettingIcon"}
                className={`icon-comment-child-setting iconfont icon-2601caidan2 fs-xl pt-1`}
              ></i>
            </div>

            <ul
              className={"comment-setting-choose-container text-center"}
              style={
                commentSetActive === 0
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <li
                className={"comment-setting-choose-child p-1 fs-md"}
                onClick={() => deleteComment(comment.id)}
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

          <div className="comment-child-info d-flex mt-2 ai-center">
            <p className="comment-child-time m-0 fs-xs text-gray">
              {countTwoDate()}
            </p>
            <button
              className={`comment-reply-bt bg-none`}
              onClick={() =>
                replyActive === 0 ? setReplyActive(1) : setReplyActive(0)
              }
            >
              {replyActive === 0 ? "關閉回覆" : "查看回覆"}
            </button>
          </div>
        </div>

        <CommentReplyList
          myInfo={myInfo}
          comment={comment}
          replyActive={replyActive}
        ></CommentReplyList>
      </div>
    </li>
  );
}
