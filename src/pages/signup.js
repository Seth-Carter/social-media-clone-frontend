import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' 
import AppIcon from '../images/icon.png'
import axios from 'axios'

//Material UI imports
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid, TextField, Button, CircularProgress } from '@material-ui/core'


const styles = {
  form: {
    textAlign: 'center',
    '& h1': {
      fontSize: '2.5rem'
    }
  },
  image: {
    width: '100%',
    maxWidth: 60,
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    margin: '20px auto 10px auto',
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  }
}


class signup extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      loading: false,
      errors: {}
    }
  }
  
  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      loading: true
    })
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    }
    axios.post('/signup', newUserData)
      .then(res => {
        localStorage.setItem(`FBIdToken`, `Bearer ${res.data.token}`)
        this.setState({
          loading: false
        })
        this.props.history.push('/')
      })
      .catch(err => {

        this.setState({
          errors: err.response.data,
          loading: false
        })
      })
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props
    const { errors, loading } = this.state
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img className={classes.image} src={AppIcon} alt="App logo" />
          <Typography variant="h2" component="h1">
            Sign Up
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
            <TextField 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              label="Confirm Password" 
              className={classes.textField}
              value={this.state.confirmPassword} 
              onChange={this.handleChange} 
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              fullWidth
            />
            <TextField 
              id="handle" 
              name="handle" 
              type="text" 
              label="Handle" 
              className={classes.textField}
              value={this.state.handle} 
              onChange={this.handleChange} 
              helperText={errors.handle}
              error={errors.handle ? true : false}
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
              Sign Up
              {loading && (
                <CircularProgress 
                  color="secondary" 
                  className={classes.progress}
                  size={30}/>
              )}
            </Button>
            <br />
            <small>Already have an account? <Link to="/login">Log in here!</Link></small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup)