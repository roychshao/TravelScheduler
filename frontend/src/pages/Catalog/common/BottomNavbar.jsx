import { useState } from 'react';
import { createUseStyles } from 'react-jss'
import { useNavigate, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import UserNavIcon from './../../../assets/BottomNavbar/userNavIcon.png'
import UserNavIconFc from './../../../assets/BottomNavbar/userNavIconFc.png'
import TravelNavIcon from './../../../assets/BottomNavbar/travelNavIcon.png'
import TravelNavIconFc from './../../../assets/BottomNavbar/travelNavIconFc.png'
import SpotNavIcon from './../../../assets/BottomNavbar/spotNavIcon.png'
import SpotNavIconFc from './../../../assets/BottomNavbar/spotNavIconFc.png'

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
        },
    })

    const classes = useStyles();
    const location = useLocation();
    const [value, setValue] = useState(location.pathname);
    const navigate = useNavigate();

    const Navigate = (newValue) => {
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
            <div onClick={() => {Navigate('/catalog/user')}}>
                {(value === '/catalog/user') ?
                    <img src={UserNavIconFc} alt="UserNavIconFc"/> :
                    <img src={UserNavIcon} alt="UserNavIcon"/>
                }
            </div>
            <div onClick={() => {Navigate('/catalog/travel')}}>
                {(value === '/catalog/travel') ?
                    <img src={TravelNavIconFc} alt="TravelNavIconFc"/> :
                    <img src={TravelNavIcon} alt="TravelNavIcon"/>
                }
            </div>
            <div onClick={() => {Navigate('/catalog/spot')}}>
                {(value === '/catalog/spot') ?
                    <img src={SpotNavIconFc} alt="SpotNavIconFc"/> :
                    <img src={SpotNavIcon} alt="SpotNavIcon"/>
                }
            </div>
        </div>
    )
}


export default BottomNavbar
