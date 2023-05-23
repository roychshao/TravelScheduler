import { useState } from 'react'
import { getgroup, creategroup } from './../../../../../actions/groupAction.js'
import { useDispatch, useSelector } from 'react-redux'
import { createUseStyles } from 'react-jss'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions
} from '@mui/material';
import CreateIcon from './../../../../../assets/CreateGroup/createIcon.png'

const CreateGroup = () => {

    const useStyles = createUseStyles({
        Container: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '15px',
        },
        BtnWrapper: {
            display: 'flex',
            width: '82%',
            paddingLeft: '4%',
            paddingRight: '4%',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '76px',
            background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.25) 0%, #FFB800 100%)',
            border: '0.5px solid #F4F9F9',
            boxShadow: 'inset 0px -10px 10px rgba(255, 184, 0, 0.4), inset 1px 1px 1px rgba(245, 245, 245, 0.55)',
            borderRadius: '10px',
        },
        Btn: {
            height: '46px',
            width: '46px',
            background: '#F9F8F4',
            boxShadow: '0px 3px 4px rgba(210, 188, 131, 0.15), inset 0px -5px 10px rgba(245, 245, 245, 0.55), inset 0px -10px 10px rgba(255, 184, 0, 0.4)',
            borderRadius: '10px',
            border: '0px',
        },
        CreateGroupText: {
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '900',
            fontSize: '14px',
            lineHeight: '19px',
            letterSpacing: '0.15em',
            color: '#F9F8F4',
            textShadow: '0px 1px 4px rgba(210, 188, 131, 0.15)',
        }
    })

    const classes = useStyles();
    const dispatcher = useDispatch();
    const [open, setOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = () => {
        // call api here
        dispatcher(creategroup(groupName, groupDescription ));
        setOpen(false);
    };

    return (
        <div className={classes.Container}>
            <div className={classes.BtnWrapper}>
                <div className={classes.CreateGroupText}>create group</div>
                <button className={classes.Btn} onClick={handleClickOpen}>
                    <img src={CreateIcon} alt="create group icon"/>
                </button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a new Group</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Group Name"
                            type="text"
                            fullWidth
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        /><TextField
                            margin="dense"
                            label="Description"
                            type="text"
                            fullWidth
                            value={groupDescription}
                            onChange={(e) => setGroupDescription(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateGroup
