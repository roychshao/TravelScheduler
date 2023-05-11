import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth, provide } from './../../../firebase.js'
import { signInWithPopup, getAuth, setPersistence, inMemoryPersistence } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { loggedinwithgoogle, register } from './../../../actions/loginAction.js'
import { FcGoogle } from 'react-icons/fc'
import { createUseStyles } from 'react-jss'

const GoogleLogin = () => {

    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const useStyles = createUseStyles({
        GoogleLogin: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            maxWidth: '300px',
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
            display: 'flex',
            justifyContent: 'center',
            width: '60%',
            position: 'fixed',
            top: '50%',
            left: '20%',
        }
    })

    const classes = useStyles();

    const googleLogin = async () => {
       
        // 登入持久化
        const Auth = getAuth();
        const result = await setPersistence(Auth, inMemoryPersistence)
            .then(() => {
                return signInWithPopup(auth, provide);
            })

        if(result) {
            const user = result.user;
            dispatcher(register(user.displayName, user.email));
            dispatcher(loggedinwithgoogle(user.displayName, user.email, user.photoURL));
            navigate('/catalog/travel');
        }
    }

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
    // }
};

export default GoogleLogin
