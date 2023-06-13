import React, { useEffect, useState } from 'react';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const StartTime = ({ Close, updateStartTime }) => {
    const [selectedTime, setSelectedTime] = useState(dayjs('15:30', 'HH:mm'));

    const handleTimeChange = (newTime) => {
        setSelectedTime(newTime);
    };

    const handleConfirmClick = () => {
        const timeString = selectedTime.format('HH:mm');
        updateStartTime(timeString);
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

export default StartTime