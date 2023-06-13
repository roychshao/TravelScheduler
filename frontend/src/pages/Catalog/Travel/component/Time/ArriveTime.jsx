import React, { useEffect, useState } from 'react';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Close } from '@mui/icons-material';

const ArriveTime = ({ Close, updateArriveTime }) => {
    const [selectedTime, setSelectedTime] = useState(dayjs('15:30', 'HH:mm'));

    const handleTimeChange = (newTime) => {
        setSelectedTime(newTime);
    };

    const handleConfirmClick = () => {
        const timeString = selectedTime.format('HH:mm');
        updateArriveTime(timeString);
        Close();      
    };

    return(
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopTimePicker 
                    value={selectedTime}
                    onChange={handleTimeChange}
                />
            </LocalizationProvider>
            <button style={{ marginTop: '10px' }} onClick={handleConfirmClick}>確定</button>
        </div>
    );
}

export default ArriveTime