import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode'
import themeSettings from './utils/theme'

//Component imports
import Navbar from './components/Navbar'
import AuthRoute from './utils/AuthRoute'

//Page imports
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

//Redux imports
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'
import axios from 'axios';

const theme = createMuiTheme(themeSettings)

const token = localStorage.FBIdToken

if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home}/>
              <AuthRoute exact path="/login" component={login}/>
              <AuthRoute exact path="/signup" component={signup}/>
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App;
