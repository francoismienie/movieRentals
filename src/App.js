import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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

  async componentDidMount() {
    try {
      const user = await auth.getAuthenticatedUser();
      this.setState({ user });
    } catch (ex) {

    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar user={this.state.user} />
        <main role="main" className="container">
          <Switch>
            <Route path='/movieform/:id' component={MovieForm} />
            <Route path='/movies/new' component={NewMovie} />
            <Route path='/movies' component={Movies} />
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
