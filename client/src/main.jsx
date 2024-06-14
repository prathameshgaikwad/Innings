import { persistor, store } from "./store.js";

import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";

const GOOGLE_OAUTH_CLIENT_ID = import.meta.env
  .VITE_SERVER_GOOGLE_OAUTH_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
