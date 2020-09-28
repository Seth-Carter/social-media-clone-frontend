import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' 
import AppIcon from '../images/icon.png'
import axios from 'axios'

//Material UI imports
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid, TextField, Button, CircularProgress } from '@material-ui/core'

// Redux imports
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'
import userReducer from '../redux/reducers/userReducer'

const styles = (theme) => ({
  ...theme.spreadThis
})

class login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
    this.setState({ errors: nextProps.UI.errors})
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData, this.props.history)
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes, UI: { loading } } = this.props
    const { errors } = this.state
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img className={classes.image} src={AppIcon} alt="App logo" />
          <Typography variant="h2" component="h1">
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField 
              id="email" 
              name="email" 
              type="email" 
              label="Email" 
              className={classes.textField}
              value={this.state.email} 
              onChange={this.handleChange}
              helperText={errors.email}
              error={errors.email ? true : false} 
              fullWidth
            />
            <TextField 
              id="password" 
              name="password" 
              type="password" 
              label="Password" 
              className={classes.textField}
              value={this.state.password} 
              onChange={this.handleChange} 
              helperText={errors.password}
              error={errors.password ? true : false}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              className={classes.button}
              disabled={loading}>
              Log In
              {loading && (
                <CircularProgress 
                  color="secondary" 
                  className={classes.progress}
                  size={30}/>
              )}
            </Button>
            <br />
            <small>Don't have an account? <Link to="/signup">Sign up here!</Link></small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))