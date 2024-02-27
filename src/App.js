import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import ProtectedComponent from "./ProtectedComponent.js";
import Default from "./Default.js";

const oktaConfig = {
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  redirectUri: process.env.REACT_APP_OKTA_REDIRECT_URI,
  scopes: ["openid", "profile", "email"],
  pkce: true,
};

const oktaAuth = new OktaAuth(oktaConfig);

const restoreOriginalUri = async (_oktaAuth, originalUri) => {
  window.history.replaceState(
    toRelativeUrl(originalUri || "/", window.location.origin)
  );
};

function App() {
  return (
    <Router>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Routes>
          {/* Wrap Route components in Routes */}
          <Route path="/login/callback" element={<LoginCallback />} />
          {/* Use element prop instead of component prop */}
          <Route
            path="/protected"
            element={
              <SecureRoute>
                <ProtectedComponent />
              </SecureRoute>
            }
          />
          {/* For SecureRoute, you may need to adjust or use a different approach if SecureRoute does not directly support the element prop */}
          <Route path="/" element={<Default />} />
        </Routes>
      </Security>
    </Router>
  );
}

export default App;
