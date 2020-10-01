import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import MyButton from '../utils/MyButton'

// Material UI Imports
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { Typography } from '@material-ui/core'

// Icons
import ChatIcon from '@material-ui/icons/Chat'

// Redux imports
import { connect } from 'react-redux'
import { likeScream, unLikeScream } from '../redux/actions/dataActions'

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}

class Scream extends Component {
  likedScream = () => {
    if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId))
    { return true
      } else return false
  }

  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId)
  }
 
  unLikeScream = () => {
    this.props.unLikeScream(this.props.scream.screamId)
  }
  render(){
    dayjs.extend(relativeTime)
    const { classes, scream : { body, createdAt, userImage, userHandle, likeCount, commentCount } } = this.props

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="Profile image" />
        <CardContent className={classes.content}>
          <Typography color="primary" component={Link} to={`/users/${userHandle}`}variant="h5">{userHandle}</Typography>
          <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="Comments">
            <ChatIcon color="primary" />
          </MyButton>
        </CardContent>
      </Card>
    )
  }
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unLikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

const mapActionsToProps = {
  likeScream,
  unLikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream))