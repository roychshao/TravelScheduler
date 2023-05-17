import { List, ListItem, ListItemText } from "@mui/material"

const MemberList = ({ members }) => {
    
    return (
        <List>
            {members.length > 0 ? (
                members.map((member) => (
                <ListItem key={member.user_id}>
                    <ListItemText primary={member.user_id}/>
                    <ListItemText primary={member.username}/>
                </ListItem>
                ))
            ):(
                <ListItem>
                    <ListItemText primary="No member available"/>
                </ListItem>
            )}
        </List>
    )
}

export default MemberList
