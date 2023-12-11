import http from "../helper/http";

const TYPE = "comment";

export default {
  //private
  deleteComment: (commentId) => {
    return http(1, "post", `${TYPE}/delete`, { id: commentId });
  },
  updateComment: (commentId, text) => {
    return http(1, "post", `${TYPE}/update`, { id: commentId, text });
  },
  addReply: (commentId, text) => {
    return http(1, "post", `${TYPE}/addReply`, { commentId, text });
  },
};
