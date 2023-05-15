import axios from 'axios';

export const creategroup = (groupName, groupDiscription) => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.post(`${hostUrl}/api/group/create`, {
            group_name: groupName,
            group_discription: groupDiscription,
        }, { withCredentials: true }).then(res => res = res.data)
        .then(res => {
            dispatch({
                type: "Create",
                payload: {
                    groupName: groupName,
                    groupDiscription: groupDiscription,
                }
            })
        }).catch(err => {
            console.log('error: ' + err.message);
        })
    }
}
