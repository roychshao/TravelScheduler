import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Person2Icon from '@mui/icons-material/Person2';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import GroupsIcon from '@mui/icons-material/Groups';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/system';

const useStyles = makeStyles({
    bottomNavbar: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundImage: 'linear-gradient(#e0eafc 30%, #fff 90%)'
    },
})

const BottomNavbar = () => {

    const classes = useStyles();

    const [value, setValue] = useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation 
            className={classes.bottomNavbar} 
            sx={{ width: 1, boxShadow: 2, height: 1/10}}
            value={value}
            onChange={handleChange}
        >
            <BottomNavigationAction
                label="User"
                value="user"
                icon={<Person2Icon sx={{ fontSize: 25 }} />}
            />
            <BottomNavigationAction
                label="Travel"
                value="travel"
                icon={<ConnectingAirportsIcon sx={{ fontSize: 35 }} />}
            />
            <BottomNavigationAction
                label="Spot"
                value="spot"
                icon={<LocationOnIcon sx={{ fontSize: 25 }} />}
            />
            <BottomNavigationAction 
                label="Group" 
                value="group" 
                icon={<GroupsIcon sx={{ fontSize: 35 }} />} 
            />
        </BottomNavigation>
    )
}


export default BottomNavbar
