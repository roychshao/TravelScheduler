import axios from 'axios';

export const getUserSpots = () => {
  return (dispatch) => {
    const hostUrl = import.meta.env.VITE_HOST_URL;
    axios.get(`${hostUrl}/api/spot/get1`, { withCredentials: true })
      .then((res) => (res = res.data))
      .then((res) => {
        if (res.success === true) {
          dispatch({
            type: "GetUserSpots",
            payload: res.data.spots,
          });
        }
      })
      .catch((err) => {
        console.log("error: " + err.message);
      });
  };
};

export const getTravelSpots = () => {
  return (dispatch) => {
    const hostUrl = import.meta.env.VITE_HOST_URL;
    axios.get(`${hostUrl}/api/spot/get2`, { withCredentials: true })
      .then((res) => (res = res.data))
      .then((res) => {
        if (res.success === true) {
          dispatch({
            type: "GetTravelSpots",
            payload: res.data.spots,
          });
        }
      })
      .catch((err) => {
        console.log("error: " + err.message);
      });
  };
};

export const createspot = (spotName, spotLocation, spotRank, spotOpenhour, spotDescription, spotTagId, spotTagName, spotTagColor) => {
  return (dispatch) => {
      const hostUrl = import.meta.env.VITE_HOST_URL;
      axios.post(
              `${hostUrl}/api/spot/create`,
              {
                spot_name: spotName,
                spot_location: spotLocation,
                spot_rank: spotRank,
                spot_openhour: spotOpenhour,
                spot_discription: spotDescription,
                spot_tag_id: spotTagId,
                spot_tag_name: spotName,
                spot_tag_color: spotTagColor,
              },
              { withCredentials: true }
          )
          .then((res) => (res = res.data))
          .then((res) => {
              if (res.success === true) {
                  dispatch(getTravelSpots());
              }
          })
          .catch((err) => {
              console.log("error: " + err.message);
          });
  };
};

export const updatespot = (spotId, spotStar, spotDescription, spotTagName) => {
  return (dispatch) => {
      const hostUrl = import.meta.env.VITE_HOST_URL;
      axios.put(
              `${hostUrl}/api/spot/update`,
              {
                  spot_id: spotId,
                  spot_star: spotStar,
                  spot_description: spotDescription,
                  spot_tag_name: spotTagName,
              },
              { withCredentials: true }
          )
          .then((res) => (res = res.data))
          .then((res) => {
              if (res.success === true) {
                  dispatch(getUserSpots());
              }
          })
          .catch((err) => {
              console.log("error: " + err.message);
          });
  };
};

export const deletespot = (spotId) => {
  return (dispatch) => {
      const hostUrl = import.meta.env.VITE_HOST_URL;
      axios.delete(
              `${hostUrl}/api/spot/delete`,
              {
                  data: {
                      spot_id: spotId,
                  },
              },
              { withCredentials: true }
          )
          .then((res) => (res = res.data))
          .then((res) => {
              if (res.success === true) {
                  dispatch(getUserSpots());
              }
          })
          .catch((err) => {
              console.log("error: " + err.message);
          });
  };
};