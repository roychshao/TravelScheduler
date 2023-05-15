import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Person2Icon from '@mui/icons-material/Person2';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import GroupsIcon from '@mui/icons-material/Groups';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/system';

const useStyles = makeStyles({
    bottomNavbar: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundImage: 'linear-gradient(#fff 10%, #e0eafc 90%)',
        zIndex: 999,
    },
})

const BottomNavbar = () => {

    const classes = useStyles();
    const location = useLocation();
    const [value, setValue] = useState(location.pathname);
    const navigate = useNavigate();
    const dispatcher = useDispatch();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case '/catalog/user':
                navigate('/catalog/user');
                break;
            case '/catalog/spot':
                navigate('/catalog/spot');
                break;
            case '/catalog/group':
                navigate('/catalog/group');
                break;
            case '/catalog/travel':
                navigate('/catalog/travel');
                break;
            default:
                console.log("no matched path to redirect");
                break;
        };
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
                value="/catalog/user"
                icon={<Person2Icon sx={{ fontSize: 25 }} />}
            />
            <BottomNavigationAction
                label="Travel"
                value="/catalog/travel"
                icon={<ConnectingAirportsIcon sx={{ fontSize: 35 }} />}
            />
            <BottomNavigationAction
                label="Spot"
                value="/catalog/spot"
                icon={<LocationOnIcon sx={{ fontSize: 25 }} />}
            />
            <BottomNavigationAction 
                label="Group" 
                value="/catalog/group"
                icon={<GroupsIcon sx={{ fontSize: 35 }} />} 
            />
        </BottomNavigation>
    )
}


export default BottomNavbar
