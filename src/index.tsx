import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CountryList from "./components/countryList";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      {/* <App /> */}
      <Navbar/>
      <CountryList />
    </ChakraProvider>
  </React.StrictMode>
);
