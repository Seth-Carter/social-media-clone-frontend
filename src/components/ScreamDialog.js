import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getScream } from '../redux/actions/dataActions'
import MyButton from '../utils/MyButton'

import { withStyles } from '@material-ui/core/styles'
import { Button, TextField, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, CircularProgress } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { Typography } from '@material-ui/core'

import CloseIcon from '@material-ui/icons/Close' 
import UnfoldMore from '@material-ui/icons/UnfoldMore' 


import dayjs from 'dayjs'

const styles = theme => ({
  ...theme.spreadThis,
  invisibleSeparator: {
    border: 'none',
    margin: 4
  }
})

class ScreamDialog extends Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
    this.props.getScream(this.props.screamId)
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, 
      scream: {
        screamId, 
        body, 
        createdAt, 
        likeCount, 
        commentCount, 
        userImage, 
        userHandle 
        }, 
        UI: { loading } } = this.props 
          

    const dialogMarkup = loading ? (
      <CircularProgress size={200}/>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage}/>
        </Grid>
        <Grid item sm={7}>
          <Typography 
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator}/>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator}/>
          <Typography variant="body1">
            {body}
          </Typography>
        </Grid>
      </Grid>
    )
    return (
        <Fragment>
          <MyButton onClick={this.handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
            <UnfoldMore color="primary" />
          </MyButton>
          <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
            <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
              <CloseIcon />
            </MyButton>      
            <DialogContent className={classes.DialogContent}>
              {dialogMarkup}
            </DialogContent>      
          </Dialog>
        </Fragment>
      )
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI
})

const mapActionsToProps = {
  getScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))