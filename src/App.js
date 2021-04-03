import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import MovieForm from './components/movieForm';
import Navbar from './components/navbar';
import NotFound from './components/notfound';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import NewMovie from './components/newMovie';
import Logout from './components/logout';
import auth from './services/authService';
import './App.css';

class App extends Component {
  state = {};

  render() {
    const user = auth.getAuthenticatedUser();

    return (
      <React.Fragment>
        <Navbar user={user} />
        <main role="main" className="container">
          <Switch>
            <ProtectedRoute path='/movieform/:id' component={MovieForm} />
            <ProtectedRoute path='/movies/new' component={NewMovie} />
            <ProtectedRoute path='/movies' render={props => <Movies {...props} user={user} />} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={Logout} />
            <Route path='/customers' component={Customers} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/notfound' component={NotFound} />
            <Redirect from='/' exact to='/movies' />
            <Redirect to='/notfound' />
          </Switch>
        </main>

      </React.Fragment>
    )
  }
}

export default App;
