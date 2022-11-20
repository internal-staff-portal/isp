import { setConfig } from "@authfunctions/react";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router";

//create async init function
async function init() {
  //define url (default at first to null)
  let url: string | null = null;

  //check if in dev mode
  if (
    process.env.NODE_ENV === "development" &&
    process.env.REACT_APP_DEV_BACKEND
  ) {
    //set url to env var defined in dev mode
    url = process.env.REACT_APP_DEV_BACKEND;
  } else {
    try {
      //fetch url from /api_url route
      const fetchedUrl: { url: string } = await fetch("/api_url").then((res) =>
        res.json(),
      );

      //set url to fetched url
      url = fetchedUrl.url;
    } catch (err) {
      //log error
      console.log(err);
    }
  }

  //check if url was found
  if (url) {
    //set authfunctions
    setConfig(url + "/api", url + "/auth");

    //render react
    const root = ReactDOM.createRoot(
      document.getElementById("root") as HTMLElement,
    );
    root.render(
      <React.StrictMode>
        <Router />
      </React.StrictMode>,
    );
  }
}

//call init function
init();
