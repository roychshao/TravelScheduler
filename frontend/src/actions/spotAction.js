import axios from 'axios';

export const getSpots = (userId) => {
  return (dispatch) => {
    const hostUrl = import.meta.env.VITE_HOST_URL;
    axios.get('/api/spot', {
      user_id: user_id
    }, { withCredentials: true })
      .then(res => res = res.data)
      .then(res => {
        dispatch({
          type: "Get",
          payload: res.data.data.spots
          //*
        });
      })
      .catch(error => {
        console.log('error: ' + err.message);
      });
  };
};