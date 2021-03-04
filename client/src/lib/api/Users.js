import API from "./BaseAPI";

import { PutSecured, Post, GetSecured } from "lib/client/REST";

const uri = "users";
const delete_uri = "delete_users";
const search_uri = "search";
const multiple_ids = "user_ids";
const object_key = "user";

const BaseAPI = new API({
  uri,
  delete_uri,
  search_uri,
  multiple_ids,
  object_key,
});

export default {
  ...BaseAPI,
  signIn: (params) => Post(`${uri}/login`, params),
  googleLogin: (params) => Post(`google/login`, params),
  signUp: (params) => Post(`${uri}/signup`, params),
  updateProfile: (params) => PutSecured(`${uri}/updateProfile`, params),
  updatePassword: (params) => PutSecured(`${uri}/changePassword`, params),
};
