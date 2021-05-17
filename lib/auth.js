import Router from "next/router";
import { setCookie, destroyCookie } from 'nookies'
import axios from "axios";
import { BASE_URL } from "../constants/api";

//login function with values of identifier and password (Strapi docs) -> 
export const login = (identifier, password) => {
  //If the window is undefinded ->
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    //axios request to post username and password to the server -> 
    axios
      .post(`${BASE_URL}/auth/local/`, { identifier, password })
      .then((res) => {
        //Create new token and sets it to the cookie storage -> 
        setCookie(null,"token",res.data.jwt, {
          maxAge: 30 * 24 * 60 * 60,
        
        });
        //If it resolves -> 
        resolve(res);
        Router.push( "/admin");
      })
      //If there is an error reject -> 
      .catch((error) => {
        reject(error);
      });
  });
};
//Logout function -> 
export const logout = () => {
  //remove cookie -> 
  destroyCookie(null,"token");
  //Removes token from all windows -> 
  delete window.__user;
  //Set logout time to match all windows -> 
  window.localStorage.setItem("logout", Date.now());
  //Send user to root -> 
  Router.push("/");
};
