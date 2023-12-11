import http from "../helper/http";
import UtilApi from "./UtilApi";

const uploadImg = async (files) => {
  if (files.length === 0) return;
  let data = new FormData();
  [...files].forEach((value) => data.append("upload", value));
  const res = await UtilApi.uploadImage(data);
  return res;
};

const TYPE = "user";

export default {
  // public
  login: (account) => {
    return http(0, "post", `${TYPE}/login`, { account });
  },
  googleLogin: (googleIdToken) => {
    return http(0, "post", `${TYPE}/googleLogin`, { googleIdToken });
  },
  register: (user, image, googleIdToken) => {
    return image != null
      ? uploadImg([image])
          .then((data) => ({ ...user, pictureUrl: data[0].url }))
          .then((userData) =>
            http(0, "post", `${TYPE}/register`, { ...userData, googleIdToken })
          )
      : http(0, "post", `${TYPE}/register`, { ...user, googleIdToken });
  },
  checkExist: (account) => {
    return http(0, "post", `${TYPE}/checkExist`, { account });
  },
  //private
  getAllusername: () => {
    return http(1, "post", `${TYPE}/getAllUsername`);
  },
  updateUser: (files, user) => {
    return files != null && files.length !== 0
      ? uploadImg(files)
          .then((urls) => {
            if (urls != null) user.pictureUrl = urls.data[0].url;
            console.log(user);
            return user;
          })
          .then((user) => http(1, "post", `${TYPE}/update`, { ...user }))
      : http(1, "post", `${TYPE}/update`, { ...user });
  },
  getMyPosts: (isNeed) => {
    return http(1, "post", `${TYPE}/getPosts`, { isNeed });
  },
  getUser: () => {
    return http(1, "post", `${TYPE}/getUser`);
  },
  getOtherUser: (id) => {
    return http(1, "post", `${TYPE}/getOtherUser`, { id });
  },
  getUserPosts: (id, isNeed) => {
    return http(1, "post", `${TYPE}/getUserPosts`, { id, isNeed });
  },
};
