import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from "@mui/material"
import { deletespot, getUserSpots, updatespot } from '../../../../actions/spotAction'


const UserSpotList = () => {

    const dispatcher = useDispatch();

    const undone_spots = useSelector(state => state.userspotReducer.undone_spots);
    const done_spots = useSelector(state => state.userspotReducer.done_spots);
    const star_spots = useSelector(state => state.userspotReducer.star_spots);
    const [open, setOpen] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);



    useEffect(() => {
        dispatcher(getUserSpots())
    }, []);

    // console.log(star_spots);


    const handleClickOpen = (spot) => {
        setSelectedSpot(spot);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // ====================update spot====================
    const [spotId, setSpotId] = useState("");
    const [spotDescription, setSpotDescription] = useState("");
    const [tagId, setTagId] = useState("")
    const [transportation, setTransportation] = useState("")
    const [startTime, setStartTime] = useState("")
    const [arriveTime, setArriveTime] = useState("")
    const [arriveId, setArriveId] = useState("")
    const [travelId, setTravelId] = useState("")

    const handleUpdateDialogOpen = () => {
        setUpdateDialogOpen(true);
    }

    const handleUpdate = () => {
        dispatcher(updatespot(
            spot_id,
            spot_description,
            tag_id,
            transportation,
            start_time,
            arrive_time,
            travel_id,
        ))
    };
    // ====================update spot====================

    const handleDelete = (SpotID) => {
        dispatcher(deletespot(SpotID));
        setConfirmDialogOpen(false);
        setOpen(false);
    };

    const confirmDelete = () => {
        setConfirmDialogOpen(true);
    };

    return (
        <div>
            <h2>"收藏的地點"</h2>
            {star_spots.length > 0 ? (
                star_spots[0].map((spot) => (
                    <div key={spot.spot_id}>
                        <Button variant="contained" color="primary" onClick={() => handleClickOpen(spot)}>
                            {spot.spot_name}
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>{selectedSpot && selectedSpot.spot_name}</DialogTitle>
                            <DialogContent>

                                <List>
                                    <ListItem>
                                        <ListItemText primary={`SpotID: ${selectedSpot && selectedSpot.spot_id}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Name: ${selectedSpot && selectedSpot.spot_name}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Location: ${selectedSpot && selectedSpot.location}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Rank: ${selectedSpot && selectedSpot.ranking}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Openhour: ${selectedSpot && selectedSpot.open_hour}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Description: ${selectedSpot && selectedSpot.description}`} />
                                    </ListItem>
                                </List>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={confirmDelete}>Delete</Button>
                                <Button onClick={handleUpdateDialogOpen}>Update</Button>

                            </DialogActions>
                        </Dialog>
                        {/* Delete */}
                        <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
                            <DialogTitle>確認刪除</DialogTitle>
                            <DialogContent>
                                確定要刪除這個地點嗎?
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setConfirmDialogOpen(false)}>取消</Button>
                                <Button onClick={() => handleDelete(selectedSpot.spot_id)}>確定</Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)}>
                            <DialogTitle>編輯資料</DialogTitle>
                            <DialogContent>
                                <form>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Spot ID"
                                        type="text"
                                        fullWidth
                                        // value="SpotId"
                                        onChange={(e) => setSpotId(e.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="SpotDescription"
                                        type="text"
                                        fullWidth
                                        // value="spotDescription"
                                        onChange={(e) => setSpotDescription(e.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Tag Id"
                                        type="text"
                                        fullWidth
                                        // value="TagId"
                                        onChange={(e) => setTagId(e.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Transportation"
                                        type="text"
                                        fullWidth
                                        // value={Transportation}
                                        onChange={(e) => setTransportation(e.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Start Time"
                                        type="text"
                                        fullWidth
                                        // value={StartTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Arrive Time"
                                        type="text"
                                        fullWidth
                                        // value={ArriveTime}
                                        onChange={(e) => setArriveTime(e.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Travel ID"
                                        type="text"
                                        fullWidth
                                        // value={travelId}
                                        onChange={(e) => setTravelId(e.target.value)}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setConfirmDialogOpen(false)}>取消</Button>
                                <Button onClick={() => handleDelete(selectedSpot.spot_id)}>確定</Button>
                            </DialogActions>
                        </Dialog>

                    </div>
                ))
            ) : (
                <ListItem>
                    <ListItemText primary="No spots available" />
                </ListItem>
            )}
        </div>
    )
}

export default UserSpotList