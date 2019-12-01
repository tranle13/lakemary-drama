// Dependencies
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
// Pages
import Home from "./pages/Home/Home";
import Post from "./pages/Post/Post";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
// Components
import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper"; 
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <Wrapper>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/home" component={Home} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Switch>
            <PrivateRoute exact path="/post" component={Post} />
          </Switch>
        </Wrapper>
      </Router>
    </Provider>
  );
}

export default App;
