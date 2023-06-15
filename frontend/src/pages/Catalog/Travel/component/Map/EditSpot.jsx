import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button'
import StartTime from "../Time/StartTime"
import ArriveTime from "../Time/ArriveTime"
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    time: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', /* 半透明黑色背景 */
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 4,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        width: 150,
        height: 90
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        fontSize: 24,
        color: '#555',
        cursor: 'pointer'
    },
    closeButtonHover: {
        color: '#000'
    }
});

const EditSpot = ({ close }) => {
    const [startTime, setStartTime] = useState(null);
    const [arriveTime, setArriveTime] = useState(null);
    const [showStartTime, setShowStartTime] = useState(false);
    const [showArriveTime, setShowArriveTime] = useState(false);

    const classes = useStyles();

    //StartTime介面
    const callStartTime = () => {
        setShowStartTime(true);
    };
    const closeStartTime = () => {
        setShowStartTime(false);
    };
    //更新Start的時間
    const updateStartTime = (time) => {
        setStartTime(time);
        console.log(time);
    };

    //ArriveTime介面
    const callArriveTime = () => {
        setShowArriveTime(true);
    };
    const closeArriveTime = () => {
        setShowArriveTime(false);
    };
    //更新Arrive的時間
    const updateArriveTime = (time) => {
        setArriveTime(time);
        console.log(time);
    };

    const passToBackend = () => {
        close();
    };
    return (
        <div>
            <p>抵達時間: {startTime}</p>
            <Button onClick={callStartTime} variant="outlined" color="info" style={{ marginRight: '10px' }}>編輯抵達時間</Button>
            <p>離開時間: {arriveTime}</p>
            <Button onClick={callArriveTime} variant="outlined" color="info">編輯離開時間</Button>
            <br/>
            <Button onClick={passToBackend} variant="outlined" color="success" style={{ marginTop: '10px' }}>確定</Button>
            <Button onClick={close} variant="outlined" color="error" style={{ marginTop: '10px' , marginLeft: '10px'}}>取消</Button>

            {showStartTime && (
                <div className={classes.time}>
                    <div className={classes.timeContent}>
                        <StartTime Close={closeStartTime} updateStartTime={updateStartTime}/>
                    </div>
                </div>
            )}

            {showArriveTime && (
                <div className={classes.time}>
                    <div className={classes.timeContent}>
                        <ArriveTime Close={closeArriveTime} updateArriveTime={updateArriveTime}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditSpot