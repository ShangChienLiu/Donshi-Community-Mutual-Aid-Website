import http from "../helper/http";

const TYPE = "topic";

export default {
  //public
  getTopics: () => {
    return http(0, "post", `${TYPE}/getAll`);
  },
  getTopicsWithType: (typeId) => {
    return http(0, "post", `${TYPE}/getWithType`, { typeId });
  },
  //private
  deleteTopic: (topicId) => {
    return http(1, "post", `${TYPE}/deleteTopic`, { topicId });
  },
  addTopic: (typeId, topicName) => {
    return http(1, "post", `${TYPE}/addTopic`, { typeId, topicName });
  },
};
