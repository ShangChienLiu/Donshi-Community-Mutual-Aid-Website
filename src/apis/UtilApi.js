import http from "../helper/http";

export default {
  //private
  checkVersion: (currentVersion) => {
    return http(1, "post", `/checkAPKversion`, { currentVersion });
  },
  checkTokExp: () => {
    return http(1, "post", `/checkTokExp`);
  },
  uploadImage: (data) => {
    return http(1, "post", `/uploadImg`, data, {
      "Content-Type": "multipart/form-data",
    });
  },
};
