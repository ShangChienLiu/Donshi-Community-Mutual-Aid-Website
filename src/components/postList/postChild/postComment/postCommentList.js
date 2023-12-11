import React, { useState, useEffect } from "react";
import Config from "../../../../Config";
import MySocketFactory from "../../../../helper/socketio";
import { useSocketIO } from "../../../../helper/useSocketio";

// component
import PostCommentChild from "./postCommentChild";

// apis
import apis from "../../../../apis";

const { BASEURL } = Config;

/**
 *
 * @param post 單篇貼文
 * @param commentActive 設定顯示隱藏留言區塊
 */
export default function PostCommentList({
  post,
  commentActive,
  myInfo,
  allUserNameList,
  index,
}) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [tagActive, setTagActive] = useState(false);
  const [tagNameList, setTagNameList] = useState([]);
  // const _onChange = (result) => {
  //   console.log("change");
  //   // const result = MySocketFactory.preprocessData(data);
  //   const changeComment = result.comment;
  //   const changePost = result.post;
  //   if (result.action === "ADD" && post.id === changePost.id) {
  //     console.log(post);
  //     console.log(changeComment);
  //     setComments(changePost.comments);
  //   } else if (result.action === "DELETE" && post.id === changePost.id) {
  //     setComments((preComments) => {
  //       const list = preComments.filter(
  //         (element) => element.id !== changeComment.id
  //       );
  //       return list;
  //     });
  //   } else if (result.action === "UPDATE" && post.id === changePost.id) {
  //     setComments((preComments) =>
  //       preComments.map((comment) =>
  //         changeComment.id === comment.id ? changeComment : comment
  //       )
  //     );
  //   }
  // };
  // const [hasError, hasConnect] = useSocketIO(_onChange);

  // useEffect(() => {
  //   let socket = null;
  //   const _onChange = (data) => {
  //     console.log("change");
  //     const result = MySocketFactory.preprocessData(data);
  //     const changeComment = result.comment;
  //     const changePost = result.post;
  //     if (result.action === "ADD" && post.id === changePost.id) {
  //       setComments((preComments) => [...preComments, changeComment]);
  //     } else if (result.action === "DELETE" && post.id === changePost.id) {
  //       setComments((preComments) => {
  //         const list = preComments.filter(
  //           (element) => element.id !== changeComment.id
  //         );
  //         return list;
  //       });
  //     } else if (result.action === "UPDATE" && post.id === changePost.id) {
  //       setComments((preComments) =>
  //         preComments.map((comment) =>
  //           changeComment.id === comment.id ? changeComment : comment
  //         )
  //       );
  //     }
  //   };
  //   const startSocket = () => {
  //     try {
  //       console.log("socket on");
  //       socket = MySocketFactory.getSocket();
  //       socket.on("change", _onChange);
  //     } catch (error) {
  //       console.log("connect error");
  //       console.log(error);
  //     }
  //   };
  //   startSocket();
  //   return () => {
  //     console.log("app socket close");
  //     socket.off("change", _onChange);
  //     MySocketFactory.clearSocket();
  //   };
  // }, []);

  useEffect(() => {
    setComments(post.comments);
    return () => {};
  }, [post]);

  const addComment = () => {
    const addComment = async (postId, text) => {
      // const res = await apis.PostApi.addComment(postId, text);
      await apis.PostApi.addComment(postId, text);

      // let newComments = [...comments];
      // newComments.push(res.data.comment);
      // setComments(newComments);

      setCommentText("");
    };

    if (commentText !== "" && commentText !== null) {
      addComment(post.id, commentText);
      document.getElementById("postCommentInput_" + index).innerHTML = "";
    }
  };

  // const deleteCommentFromList = (commentIndex) => {
  //   let newComments = [...comments];
  //   if (commentIndex !== -1) {
  //     newComments.splice(commentIndex, 1);
  //     setComments(newComments);
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    addComment();
  };

  const commentChangeListner = (e) => {
    setCommentText(e.target.innerHTML);
    if (e.target.textContent.indexOf("@") > -1) {
      const startMouse = e.target.textContent.indexOf("@");
      if (e.target.textContent.substr(startMouse + 1)) {
        setTagNameList([]);
        const tagingName = e.target.textContent.substr(startMouse + 1);
        allUserNameList.forEach((tagName) => {
          if (tagName.username.includes(tagingName)) {
            setTagNameList((preTagNameList) => preTagNameList.concat(tagName));
          }
        });
      }
      setTagActive(true);
    } else {
      setTagActive(false);
    }
  };

  const chooseTagName = (tagName) => {
    const startTag = commentText.indexOf("@");
    let newComment = commentText.substring(0, startTag);
    const tagUserName = tagName.username;
    const tagUserId = tagName.id;
    const tagHTML = `<font color="#FE2026" id="${tagUserId}">${tagUserName}</font> &nbsp`;
    newComment = newComment + tagHTML;
    document.getElementById("postCommentInput_" + index).innerHTML = newComment;
    setCommentText(newComment);
    setTagActive(false);
  };

  return (
    // commentActive => 留言顯示或隱藏
    <div
      className="info-post-comment py-2"
      style={commentActive === 1 ? { display: "none" } : { display: "block" }}
    >
      <div className="comment-container pt-3">
        <div className="post-comment d-flex ai-center">
          {/* user img */}
          <img
            className={"post-comment-self-img mr-2"}
            src={
              myInfo.pictureUrl
                ? `${BASEURL}${myInfo.pictureUrl}`
                : require("../../../../assets/image/profile.png")
            }
            alt=""
          />
          <form
            className="send-comment d-flex ai-center w-100 bg-gray-3"
            onSubmit={handleSubmit}
          >
            <div
              id={"postCommentInput_" + index}
              className="post-comment-input ml-2 p-2 pl-3 w-100 bg-gray-3 fs-lgs ml-1"
              type="text"
              placeholder="留言..."
              contentEditable="true"
              onInput={(e) => commentChangeListner(e)}
            ></div>
            <i
              className="icon-send-comment iconfont icon-send fs-xl mr-4 text-blue-1"
              onClick={addComment}
            ></i>
            <ul
              className={`comment-tag-container p-2 bg-white ${
                tagActive ? "comment-tag-active" : ""
              }`}
            >
              {tagNameList.map((tagName, index) => (
                <li
                  className={`comment-tag-child text-center p-2 fs-lgs`}
                  key={index}
                  index={index}
                  onClick={() => chooseTagName(tagName)}
                >
                  {tagName.username}
                </li>
              ))}
            </ul>
          </form>
        </div>

        <div className="comment-list">
          <ul className="comment-list-container p-0">
            {/* 循環出每一則留言 */}
            {comments.map((comment, index) => (
              // comment child
              <PostCommentChild
                key={index}
                index={index}
                // deleteCommentFromList={deleteCommentFromList}
                comment={comment}
                myInfo={myInfo}
              ></PostCommentChild>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
