import axios from 'axios';

export const getgroup = () => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.get(`${hostUrl}/api/group/`, { withCredentials: true }).then(res => res = res.data)
            .then(res => {
                if(res.success === true) {
                    dispatch({
                        type: "GetGroup",
                        payload: res.data.groups
                    })
                }
            }).catch(err => {
                console.log('error: ' + err.message);
            })
    }
}

export const creategroup = (groupName, groupDescription) => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.post(`${hostUrl}/api/group/create`, {
            group_name: groupName,
            group_description: groupDescription,
        }, { withCredentials: true }).then(res => res = res.data)
            .then(res => {
                if(res.success === true) {
                    dispatch({
                        type: "CreateGroup",
                    });
                    // create group後執行get group
                    dispatch(getgroup());
                }
            }).catch(err => {
                console.log('error: ' + err.message);
            })
    }
}
