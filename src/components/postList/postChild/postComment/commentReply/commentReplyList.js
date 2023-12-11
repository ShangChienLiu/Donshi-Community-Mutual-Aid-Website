import React, { useState, useEffect } from "react";
import Config from "../../../../../Config";

// component
import PostReplyChild from "./commentReplyChild";

// apis
import apis from "../../../../../apis";

const { BASEURL } = Config;

/**
 *
 * @param comment 單篇留言
 * @param replyActive 設定顯示隱藏回復區塊
 */
export default function CommentReplyList({ comment, replyActive, myInfo }) {
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState(comment.replies);

  useEffect(() => {
    setReplies(comment.replies);
    return () => {};
  }, [comment]);

  const addReply = () => {
    const addReply = async (commentId, text) => {
      await apis.CommentApi.addReply(commentId, text);

      // let newReplies = [...replies];
      // newReplies.push(res.data.reply);
      // setReplies(newReplies);

      setReplyText("");
    };

    addReply(comment.id, replyText);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addReply();
  };

  return (
    // replyActive => 回復顯示或隱藏
    <div
      className="post-comment-reply py-2 w-100"
      style={replyActive === 1 ? { display: "none" } : { display: "block" }}
    >
      <div className="comment-reply-container pt-3">
        <div className="reply-list">
          <ul className="reply-list-container p-0">
            {/* 循環出每一則留言 */}
            {replies.map((reply, index) => (
              // reply child
              <PostReplyChild
                key={index}
                reply={reply}
                myInfo={myInfo}
              ></PostReplyChild>
            ))}
          </ul>
        </div>
      </div>

      <div className="comment-reply d-flex ai-center w-100">
        {/* user img */}
        <img
          className={"comment-reply-self-img mr-2"}
          src={
            myInfo.pictureUrl
              ? `${BASEURL}${myInfo.pictureUrl}`
              : require("../../../../../assets/image/profile.png")
          }
          alt=""
        />
        <form
          className="send-reply d-flex ai-center w-100 bg-gray-3"
          onSubmit={handleSubmit}
        >
          <input
            className="comment-reply-input ml-2 p-2 pl-3 w-100 bg-gray-3 fs-lgs ml-1"
            type="text"
            placeholder="留言..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          ></input>
          <i
            className="icon-send-reply iconfont icon-send fs-xl mr-4 text-blue-1"
            onClick={addReply}
          ></i>
        </form>
      </div>
    </div>
  );
}
