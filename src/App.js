import React, { createContext, useState } from 'react'
import './App.css';
import Header from './componets/Header/Header';
import Shop from './componets/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './componets/Review/Review';
import Inventory from './componets/Inventory/Inventory';
import Notfound from './componets/Notfound/Notfound';
import Shipment from './componets/Shipment/Shipment';
import Login from './componets/Login/Login';
import ProductDetail from './componets/ProductDetail/ProductDetail';
import PrivateRoute from './componets/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App(props) {
  const [loggedInUser, setloggedInUser] = useState({})
  return (
    <UserContext.Provider value= {[loggedInUser, setloggedInUser]}>
      <h2>User Email : {loggedInUser.email}</h2>
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path='/'>
            <Shop></Shop>
          </Route>
          <Route path="/product/:ProductKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
