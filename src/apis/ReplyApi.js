import http from "../helper/http";

const TYPE = "reply";

export default {
  //private
  deleteReply: (replyId) => {
    return http(1, "post", `${TYPE}/delete`, { id: replyId });
  },
  updateReply: (replyId, text) => {
    return http(1, "post", `${TYPE}/update`, { id: replyId, text });
  },
};
