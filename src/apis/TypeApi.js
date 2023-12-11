import http from "../helper/http";

const TYPE = "type";

export default {
  //public
  getTypes: () => {
    return http(0, "post", `${TYPE}/getAll`);
  },
};
