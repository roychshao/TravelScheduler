import axios from 'axios';

export const getSpots = (userId) => {
    return (dispatch) => {
      dispatch({ type: 'FETCH_SPOTS_REQUEST' });
  
      axios.get('/api/spot', { user_id: user_id
      })
        .then(response => {
          dispatch({
            type: 'FETCH_SPOTS_SUCCESS',
            payload: response.data.data.spots
          });
        })
        .catch(error => {
          dispatch({
            type: 'FETCH_SPOTS_FAILURE',
            payload: error.message
          });
        });
    };
};