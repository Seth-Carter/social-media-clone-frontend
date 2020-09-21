import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Material UI Imports
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { Typography } from '@material-ui/core'

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
  render(){
    const { classes, scream : { body, createdAt, userImage, userHandle, likeCount, commentCount } } = this.props

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="Profile image" />
        <CardContent className={classes.content}>
          <Typography color="primary" component={Link} to={`/users/${userHandle}`}variant="h5">{userHandle}</Typography>
          <Typography variant="body2" color="textSecondary">{createdAt}</Typography>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Scream)