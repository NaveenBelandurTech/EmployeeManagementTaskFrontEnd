import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {BrowserRouter} from 'react-router-dom'
import Store from "./Component/Features/Store/store";
import App from "./App";
import "./index.css";
import 'sweetalert2/themes/bootstrap-5.css'



const Container = document.getElementById("root");
const Root = createRoot(Container);
Root.render(
  <Provider store={Store}>
    {console.log(Store.getState())}
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
);
