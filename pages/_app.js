import React from "react";
import App from "next/app";
import Router from "next/router";
import { parseCookies, destroyCookie } from "nookies";
import ProgressBar from "@badrap/bar-of-progress";
import Layout from "../components/layout/Layout";
import AppContext from "../context/AppContext";
import { BASE_URL } from "../constants/api";
import "bootstrap/dist/css/bootstrap.min.css";

//Loading progress bar styling ->
const progress = new ProgressBar({
  size: 1,
  color: "#fff",
  className: "bar-of-progress",
});
//Loading progress bar logic ->
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

//set default state of app ->
class MyApp extends App {
  state = {
    user: null,
  };

  //Set new state if user is authenticated ->
  componentDidMount(ctx) {
    //Get token from cookies ->
    const token = parseCookies(ctx).token;
    //if token fetch user data ->
    if (token) {
      fetch(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        //if user logsout or if not valid ->
        if (!res.ok) {
          //Remove/Delete token  from cookies ->
          destroyCookie(null, "token");
          //Set user state to null ->
          this.setState({ user: null });
          return null;
        }
        //if ok set state to user ->
        const user = await res.json();
        this.setUser(user);
      });
    }
  }
  //if token - set the state from null to user ->
  setUser = (user) => {
    this.setState({ user });
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          isAuthenticated: !!this.state.user,
          setUser: this.setUser,
        }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    );
  }
}

export default MyApp;
