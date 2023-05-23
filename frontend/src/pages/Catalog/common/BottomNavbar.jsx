import { useState } from 'react';
import { createUseStyles } from 'react-jss'
import { useNavigate, useLocation } from 'react-router-dom'

const BottomNavbar = () => {

    const useStyles = createUseStyles({
        Container: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            height: '82px',
            position: 'fixed',
            bottom: '0px',
            left: '0px',
            zIndex: 999,
            background: '#FFFFFF',
            boxShadow: '0px 1px 4px rgba(210, 188, 131, 0.15)',
            backdropFilter: 'blur(30px)',
            /* Note: backdrop-filter has minimal browser support */
            borderRadius: '100px',
            // transform: 'matrix(1, 0, 0, -1, 0, 0)',
        }
    })

    const classes = useStyles();
    const location = useLocation();
    const [value, setValue] = useState(location.pathname);
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case '/catalog/user':
                navigate('/catalog/user');
                break;
            case '/catalog/spot':
                navigate('/catalog/spot');
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
        <div className={classes.Container}>
            <div>User</div>
            <div>Travel</div>
            <div>Spot</div>
        </div>
    )
}


export default BottomNavbar
