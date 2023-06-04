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
import CreateGroupIcon from './../../../../../assets/CreateGroup/createGroupIcon.png'

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
        },
        Closed: {
            display: 'none',
        },
        Overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            zIndex: 1000,
        },
        Dialog: {
            display: 'flex',
            justifyContent: 'center',
            position: 'fixed',
            top: '21%',
            left: '15%',
            width: '70%',
            height: '58%',
            background: 'linear-gradient(180deg, rgba(249, 249, 244) 0%, rgba(241, 238, 230) 100%)',
            border: '0.5px solid #F9F8F4',
            boxShadow: 'inset 1px 1px 1px rgba(244, 249, 249, 0.55)',
            borderRadius: '10px',
            zIndex: 1001,
        },
        CreateGroupIcon: {
            position: 'relative',
            top: '15px',
            height: '81px',
            width: '86px',
            marginBottom: '15px',
        },
        ContentWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '90%',
        },
        TitleWrapper: {
            display: 'flex',
            justifyContent: 'left',
            marginTop: '10px',
            width: '100%',
        },
        Title: {
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '15px',
            lineHeight: '17px',
            letterSpacing: '0.15em',
            color: '#FFB800',
        },
        Input: {
            marginTop: '5px',
            height: '44px',
            width: '100%',
            background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.08) 0%, rgba(255, 184, 0, 0.2) 100%)',
            borderRadius: '10px',
            border: '0px',
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '17px',
            letterSpacing: '0.1rem',
            color: '#FFB800',
            textAlign: 'center',
            '&:focus': {
                border: '0px',
                outline: 'none',
            },
            '&::placeholder': {
                color: '#FFB800',
            },
        },
        SaveBtn: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.6) 0%, #FFB800 100%)',
            borderRadius: '5px',
            width: '100%',
            height: '44px',
            marginTop: '25px',
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.15em',
            color: '#F5F5F5',
        },
        CancelBtn: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '25px',
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.15em',
            color: '#FFB800',
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
        if(groupName.length != 0) {
            dispatcher(creategroup(groupName, groupDescription ));
            setOpen(false);
        }
    };

    return (
        <div className={classes.Container}>
            <div className={classes.BtnWrapper}>
                <div className={classes.CreateGroupText}>create group</div>
                <button className={classes.Btn} onClick={handleClickOpen}>
                    <img src={CreateIcon} alt="create group icon"/>
                </button>
            </div>
            <div className={open ? classes.Overlay: classes.Closed} onClick={handleClose}></div>
            <div className={open ? classes.Dialog : classes.Closed}>
                <div className={classes.ContentWrapper}>
                    <img src={CreateGroupIcon} className={classes.CreateGroupIcon} alt="create group icon"/>
                    <div className={classes.TitleWrapper}>
                        <div className={classes.Title}>Group Name</div>
                    </div>
                    <input className={classes.Input} type="text" placeholder="New Group" onChange={(e) => setGroupName(e.target.value)}/>
                    <div className={classes.TitleWrapper}>
                        <div className={classes.Title}>Group Description</div>
                    </div>
                    <input className={classes.Input} type="text" placeholder="Description" onChange={(e) => setGroupDescription(e.target.value)}/>
                    <div className={classes.SaveBtn} onClick={handleCreate}>Save Group</div>
                    <div className={classes.CancelBtn} onClick={handleClose}>Cancel</div>
                </div>
            </div>
        </div>
    )
}

export default CreateGroup
