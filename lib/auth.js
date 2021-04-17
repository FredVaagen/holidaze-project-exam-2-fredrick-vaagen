import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";
import {BASE_URL} from "../constants/api"

export const login = (identifier, password) => {
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/auth/local/`, { identifier, password })
      .then((res) => {
        Cookie.set("token", res.data.jwt);
        resolve(res);
        Router.push("/admin");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const logout = () => {
  Cookie.remove("token");
  delete window.__user;
  window.localStorage.setItem("logout", Date.now());
  Router.push("/");
};
