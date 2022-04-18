import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { makeServer } from "./server";
import { DataProvider, ThemeProvider, AuthProvider } from 'context';

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <ThemeProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
