// react imports
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// packages imports

// local imports
import LoginPage from "./components/pages/LoginPage";
import ProfilePage from "./components/pages/ProfilePage";
import Layout from "./components/Layout";

// context
export const UserContext = React.createContext();

function App() {
  // hooks
  const [user, setUser] = useState({});

  return (
    <div>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Layout>
            <Switch>
              <Route path="/" exact>
                <LoginPage />
              </Route>
              <Route path="/profile">
                <ProfilePage />
              </Route>
            </Switch>
          </Layout>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
