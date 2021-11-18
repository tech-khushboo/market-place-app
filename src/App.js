import React from "react";
import { Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Product from "./containers/Product";
import Cart from "./containers/Cart";
import './App.css';

const theme = createTheme();

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <div style={{ margin: 5, marginTop: 80, clear: "both", minHeight: '80vh' }}>
            <Route exact path="/" component={Product} />
            <Route exact path="/product" component={Product} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/login" component={LogIn} />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
