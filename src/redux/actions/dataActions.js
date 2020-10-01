import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM } from '../types'
import axios from 'axios'

export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA })
  axios
    .get('/screams/get')
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: []
      })
    })
}

export const getScream = (screamId) => dispatch =>{
  dispatch({ type: LOADING_DATA})
  axios.get(`/screams/${screamId}`)
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_SCREAMS,
        payload: []
      })
    })
}

export const likeScream = (screamId) => dispatch => {
  axios.get(`/scream/${screamId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}
export const unLikeScream = (screamId) => dispatch => {
  axios.get(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}