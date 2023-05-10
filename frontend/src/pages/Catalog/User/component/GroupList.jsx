import { useDispatch, useSelector } from 'react-redux'
import { List, ListItem, ListItemText } from "@mui/material"

const GroupList = () => {
    const groups = useSelector(state => state.groupReducer.groups);

    console.log(groups);

    return (
        <List>
            {groups.map((group) => (
                <ListItem key={group.group_id}>
                    <ListItemText primary={group.groupName}/>
                </ListItem>
            ))}
        </List>
    )
}

export default GroupList
