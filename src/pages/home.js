import { Grid } from '@material-ui/core'
import React, { Component, component } from 'react'
import axios from 'axios'

import Scream from '../components/Scream'

class home extends Component {
  state = {
    screams: null
  }
  
  componentDidMount(){
    axios.get('/screams/get')
      .then(res => {
        this.setState({
          screams: res.data
        })
      })
  }
  render() {
    let recentScreamsMarkup = this.state.screams ? (
    this.state.screams.map(scream => <Scream scream={scream}/>)) : <p>Loading...</p>
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    )
  }
}

export default home