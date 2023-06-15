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

export const createspot = (spotName, spotLatitude, spotLongitude, spotLocation, spotRank, spotOpenhour, spotTagName, spotStartTime, spotArriveTime) => {
  return (dispatch) => {
      const hostUrl = import.meta.env.VITE_HOST_URL;
      axios.post(
              `${hostUrl}/api/spot/create`,
              {
                spot_name: spotName,
                spot_latitude: spotLatitude,
                spot_longtitude: spotLongitude,
                spot_location: spotLocation,
                spot_rank: spotRank,
                spot_openhour: spotOpenhour,
                spot_description: "hello",
                spot_tag_name: spotTagName,
                spot_tag_color: "purple",
                arrive_id: "null",
                spot_transportation: "null",
                spot_start_time: spotStartTime,
                spot_arrive_time: spotArriveTime,
                travel_id: 1
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


export const updatespot = (hasId, spotId, spotDescription, spotTagName, spotTransportation, spotStartTime, spotArriveTime, spotArriveId, spotTravelId, spotStar) => {
  return (dispatch) => {
      const hostUrl = import.meta.env.VITE_HOST_URL;
      axios.put(
              `${hostUrl}/api/spot/update`,
              {
                has_id: hasId,
                spot_id: spotId,
                spot_description: spotDescription,
                spot_tag_name: spotTagName,
                spot_transportation: spotTransportation,
                spot_start_time: spotStartTime,
                spot_arrive_time: spotArriveTime,
                arrive_id: spotArriveId,
                travel_id: spotTravelId,
                spot_star: spotStar
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