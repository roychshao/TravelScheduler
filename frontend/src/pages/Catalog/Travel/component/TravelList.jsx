import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from "@mui/material"
import { gettravel, deletetravel } from './../../../../actions/travelAction.js'
import EditTravel from './EditTravel.jsx'

const TravelList = () => {

    const dispatcher = useDispatch();
    const travels = useSelector(state => state.travelReducer.travels);
    useEffect(() => {
        dispatcher(gettravel());
    }, [])
    console.log(travels);

    // ====================UPDATE====================
    const [selectedTravel, setSelectedTravel] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

    const handleUpdateDialogOpen = () => {
        setUpdateDialogOpen(true);
    }
    const handleUpdate = () => {
        dispatcher()
    }

    // ====================UPDATE====================

    // ====================DELETE====================
    const handleDelete = (TravelID) => {
        dispatcher(deletetravel(TravelID));
        setConfirmDialogOpen(false);
    };

    const confirmDelete = () => {
        setConfirmDialogOpen(true);
    };
    // ====================DELETE====================

    return (
        <List>
            <ListItem>
                <ListItemText primary="Travel Name" />
                {/* <ListItemText primary="Travel Description" /> */}
                {/* <ListItemText primary="Travel PeopleNum" /> */}
                {/* <ListItemText primary="Travel Date" /> */}
                {/* <ListItemText primary="Travel Done" /> */}
                <ListItemText primary="Travel ID" />
                {/* <ListItemText primary="Group ID" /> */}
            </ListItem>
            {travels.length > 0 ? (
                travels[0].map((travel) => (
            <ListItem key={travel.travel_id}>
                <ListItemText primary={travel.travel_name} />
                {/* <ListItemText primary={travel.travel_description} />
                <ListItemText primary={travel.travel_peoplenum} />
                <ListItemText primary={travel.travel_date} />
                <ListItemText primary={travel.travel_done} /> */}
                <ListItemText primary={travel.travel_id} />
                {/* <ListItemText primary={travel.group_id} /> */}
                <EditTravel targetTravel={travel} />


                <DialogActions>
                    {/* <Button variant="contained" color="primary" onClick={handleUpdateDialogOpen}>Update</Button> */}
                    <Button variant="contained" color="primary" onClick={confirmDelete}>Delete</Button>

                </DialogActions>
                {/* ====================Delete==================== */}
                <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
                    <DialogTitle>確認刪除</DialogTitle>
                    <DialogContent>
                        確定要刪除這個行程嗎?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmDialogOpen(false)}>取消</Button>
                        <Button onClick={() => handleDelete(travel.travel_id)}>確定</Button>
                    </DialogActions>
                </Dialog>
                {/* ====================Delete==================== */}

            </ListItem>
            ))
            ) : (
            <ListItem>
                <ListItemText primary="No travels available" />
            </ListItem>
            )}
        </List>
    )
}

export default TravelList