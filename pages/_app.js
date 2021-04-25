import React from "react";
import App from "next/app";
import Cookie from "js-cookie";
import fetch from "isomorphic-unfetch";
import Layout from "../components/layout/Layout";
import AppContext from "../context/AppContext";
import { BASE_URL } from "../constants/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

const progress = new ProgressBar({
  size: 1,
  color: "#fff",
  className: "bar-of-progress",
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

class MyApp extends App {
  state = {
    user: null,
  };

  componentDidMount() {
    const token = Cookie.get("token");
    if (token) {
      fetch(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        if (!res.ok) {
          Cookie.remove("token");
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        this.setUser(user);
      });
    }
  }

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
