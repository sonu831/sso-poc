import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

const ProtectedComponent = () => {
  const { authState, oktaAuth } = useOktaAuth();

  if (!authState || !authState.isAuthenticated) {
    // If the user is not authenticated, you can handle it here.
    // This could redirect them to login, display a message, etc.
    // Since SecureRoute is used, the user should be redirected to login by default.
    return <div>Loading...</div>;
  }

  const logout = async () => {
    // Logout from Okta session
    await oktaAuth.signOut();
  };

  return (
    <div>
      <h2>Protected Page</h2>
      <p>This is a protected page. You must be logged in to see it.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProtectedComponent;
