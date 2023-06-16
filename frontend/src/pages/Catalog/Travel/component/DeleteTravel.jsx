import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletetravel } from '../../../../actions/travelAction';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';

const DeleteTravel = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [travelId, setTravelId] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        dispatch(deletetravel(travelId));
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete Travel</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Travel ID"
                        type="text"
                        fullWidth
                        value={travelId}
                        onChange={(e) => setTravelId(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteTravel;
