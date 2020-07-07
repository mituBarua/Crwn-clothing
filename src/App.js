import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import {createStructuredSelector} from 'reselect'; 
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from './pages/shop/shop.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component'; 
import Header from './components/header-component/header.component';
import SignInAndSignUpPage from './pages/sign-in-up page/sign-in-up.component';
import {auth, createUserProfileDocument} from './firbase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';
import {selectCurrentUser} from './redux/user/user.selectors';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {

    return (
      <div>
      <Header />
      <Switch>
      <Route exact path = '/' component ={Homepage} />
      <Route path ='/shop' component ={ShopPage} />
      <Route exact path='/checkout' component = {CheckoutPage} />
      <Route 
      exact path ='/signin'
       render={() =>
      this.props.currentUser ? (
        <Redirect to ='/' />

      ) : (
        <SignInAndSignUpPage />
      )
      }

      />
      </Switch>
      
      </div>
      );
    }
  }
  const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser
  });

 const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
 }) ;

export default connect
(mapStateToProps,mapDispatchToProps) (App);
