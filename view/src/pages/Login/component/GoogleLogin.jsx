import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth, provide } from './../../../firebase.js'
import { signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { loggedinwithgoogle } from './../../../actions/loginAction.js'
import { setuserprofile } from './../../../actions/userAction.js'
import { FcGoogle } from 'react-icons/fc'
import { createUseStyles } from 'react-jss'

const GoogleLogin = () => {
    
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const useStyles = createUseStyles({
        GoogleLogin: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '80%',
            height: '200%',
            backgroundColor: 'white',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#444',
            borderRadius: '5px',
            border: 'thin solid #888',
            boxShadow: '1px 1px 1px grey',
            cursor: 'pointer',
        },
        Wrapper: {
            width: '60%',
            position: 'fixed',
            top: '50%',
            left: '25%'
        }
    })

    const classes = useStyles();

    const [onLogin, setOnLogin] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const loginUser = await getRedirectResult(auth)
                if(loginUser) {
                    dispatcher(loggedinwithgoogle());
                    dispatcher(setuserprofile(loginUser.user.displayName, loginUser.user.email))
                    navigate('/catalog/travel');
                }
            } catch (err) {
                console.log(err);
            }
        };
        setOnLogin(false);
        getData();
    }, [onLogin])

    const googleLogin = async () => {
        setOnLogin(true);
        const button = document.getElementById("google-login-btn");
        signInWithRedirect(auth, provide);
    }

    if(onLogin) {
        return null;
    }
    else {
        return (
            <div className={classes.Wrapper}>
                <button
                    id="google-login-btn"
                    className={classes.GoogleLogin} 
                    onClick={googleLogin}>
                    <FcGoogle size='1.5rem'/>
                    Login with Google
                </button>
            </div>
        );
    }
};

export default GoogleLogin
