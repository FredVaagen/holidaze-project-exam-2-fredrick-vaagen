import Router from "next/router";
import { setCookie, destroyCookie } from 'nookies'
import axios from "axios";
import { BASE_URL } from "../constants/api";

export const login = (identifier, password) => {
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/auth/local/`, { identifier, password })
      .then((res) => {
        setCookie(null,"token",res.data.jwt, {
          maxAge: 30 * 24 * 60 * 60,
        
        });
        resolve(res);
        Router.push( "/admin");

      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const logout = () => {
  destroyCookie(null,"token");
  delete window.__user;
  window.localStorage.setItem("logout", Date.now());
  Router.push("/");
};
