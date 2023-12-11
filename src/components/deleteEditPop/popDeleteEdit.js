import React from "react";

// API
import apis from "../../apis";

export default function PopDeleteEdit({
  topStyle,
  showDeleteEditPop,
  setShowDeleteEditPop,
  deletePostFromList,
  deleteEditPost,
  setDeleteEditPost,
  setShowPopPost,
}) {
  const closePop = () => {
    setShowDeleteEditPop(0); // 隱藏編輯刪除
    let mo = function (e) {
      e.preventDefault();
    };
    document.body.style.overflow = ""; //出現滾動條
    document.removeEventListener("touchmove", mo, false); //禁止頁面滑動
  };
  const deleteButton = (e) => {
    e.preventDefault();
    // 刪除database中的post
    const deletePost = async (postId, postIndex) => {
      await apis.PostApi.deletePost(postId);
      deletePostFromList(postIndex);
      closePop();
    };
    deletePost(deleteEditPost.post.id, deleteEditPost.index);
  };
  const editButton = (e) => {
    e.preventDefault();
    setShowDeleteEditPop(0); // 隱藏編輯刪除
    setDeleteEditPost((pre) => ({ ...pre, edit: true }));
    setShowPopPost(1);
  };

  return (
    // 彈跳視窗-編輯刪除區
    <form
      id="deleteEditPop"
      style={topStyle}
      onSubmit={(e) => e.preventDefault()}
      className={`form-delete-edit jc-center ai-center w-100 h-100
        ${showDeleteEditPop === 0 ? "" : "show-delete-edit-pop"}`}
    >
      <div className="pop-delete-edit-container d-flex bg-white flex-col w-100">
        <button
          className="pop-delete w-100 bg-white fs-xl p-2"
          onClick={deleteButton}
        >
          刪除
        </button>
        <button
          className="pop-edit w-100 bg-white fs-xl p-2"
          onClick={editButton}
        >
          編輯
        </button>
      </div>
    </form>
  );
}
