import http from "../helper/http";
import UtilApi from "./UtilApi";

const uploadImg = async (files) => {
  if (files.length === 0) return;
  let data = new FormData();
  let updateFileList = [],
    originFileList = [];
  let res;
  [...files].forEach((file) => {
    file.url != null ? originFileList.push(file) : updateFileList.push(file);
  });
  [...updateFileList].forEach((value) => data.append("upload", value));
  res = await UtilApi.uploadImage(data);
  if (originFileList.length !== 0) {
    res.data = res.data.concat(originFileList);
  }
  return res.data;
};

const TYPE = "post";

export default {
  // public
  query: (search, isNeed) => {
    // search:String , isNeed : "true"||"false"
    return http(0, "post", `${TYPE}/query`, { search, isNeed });
  },
  getById: (postId) => {
    // postId : String
    return http(0, "post", `${TYPE}/getById`, { postId });
  },
  getPosts: (typeId, isNeed) => {
    // typeId:INT , isNeed : "true"||"false"
    return http(0, "post", `${TYPE}/getAllWithType`, { typeId, isNeed });
  },
  getLimitPosts: (typeId, isNeed, offset, limit) => {
    // typeId : int , isNeed : 'true' | 'false'
    // offset : int 從第幾筆資料開始
    // limit : int 一次幾筆
    return http(0, "post", `${TYPE}/getLimitWithType`, {
      typeId,
      isNeed,
      offset,
      limit,
    });
  },
  // private
  // files : Array[MyFile], newPost : Post
  addNewPost: (files, post) => {
    // post : object(post)
    return files != null && files.length !== 0
      ? uploadImg(files)
          .then((urls) => {
            if (urls != null) post.files = urls;
            return post;
          })
          .then((post) => http(1, "post", `${TYPE}/addNewPost`, { ...post }))
      : http(1, "post", `${TYPE}/addNewPost`, { ...post });
  },
  // postId : String
  deletePost: (postId) => {
    return http(1, "post", `${TYPE}/delete`, { postId });
  },
  // files : Array[MyFile], post : Post
  updatePost: (files, post) => {
    return files != null && files.length !== 0
      ? uploadImg(files)
          .then((urls) => {
            if (urls != null) post.files = urls;
            return post;
          })
          .then((post) => http(1, "post", `${TYPE}/update`, { ...post }))
      : http(1, "post", `${TYPE}/update`, { ...post });
  },
  // postId : String , text : String
  addComment: (postId, text) => {
    return http(1, "post", `${TYPE}/addComment`, { postId, text });
  },
};
