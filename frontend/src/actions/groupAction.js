import axios from 'axios';

export const creategroup = (groupName, groupDiscription, groupPeoplenum) => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.post(`${hostUrl}/api/group/create`, {
            group_name: groupName,
            group_discription: groupDiscription,
            group_peoplenum: groupPeoplenum
        }, { withCredentials: true }).then(res => res = res.data)
        .then(res => {
            dispatch({
                type: "Create",
                payload: {
                    groupName: groupName,
                    groupDiscription: groupDiscription,
                    groupPeoplenum: groupPeoplenum
                    
                }
            })
        }).catch(err => {
            console.log('error: ' + err.message);
        })
    }
}
