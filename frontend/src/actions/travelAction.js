import axios from "axios";

export const gettravel = () => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.get(`${hostUrl}/api/travel/`, { withCredentials: true }).then(res => res = res.data)
            .then(res => {
                if (res.success === true) {
                    dispatch({
                        type: "Get",
                        payload: res.data.travels
                    })
                }
            }).catch(err => {
                console.log('error: ' + err.message);
            })
    }
}

export const createtravel = (
    travelName,
    groupId,
    travelDate,
    // travelPeoplenum,
    travelDescription,
    // travelDone,
) => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.post(`${hostUrl}/api/travel/create`, {
            travel_name: travelName,
            group_id: groupId,
            travel_date: travelDate,
            // travel_peoplenum: travelPeoplenum,
            travel_description: travelDescription,
            // travel_done: travelDone,

        }, { withCredentials: true }).then(res => res = res.data)
            .then(res => {
                if (res.success === true) {
                    dispatch({
                        type: "Create",
                    });

                    // create travel後執行get travel
                    dispatch(gettravel());
                }
            }).catch(err => {
                console.log('error: ' + err.message);
            })
    }
}
