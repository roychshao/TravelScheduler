import { useState } from 'react'
import { getgroup, deletegroup } from './../../../../actions/groupAction.js'
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions
} from '@mui/material';

const DeleteGroup = ({ groupId, groupName }) => {

    const dispatcher = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        // call api here
        dispatcher(deletegroup(groupId));
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Do you really want to delete Group: {groupName}?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteGroup
