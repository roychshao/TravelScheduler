import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth, provide } from './../../../firebase.js'
import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { loggedinwithgoogle, register } from './../../../actions/loginAction.js'
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

    /* 使用signInWithRedirect則將註解部份去掉 */
    // const [onLogin, setOnLogin] = useState(false);

    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const loginUser = await getRedirectResult(auth)
    //             if(loginUser) {
    //                 dispatcher(loggedinwithgoogle());
    //                 dispatcher(setuserprofile(loginUser.user.displayName, loginUser.user.email))
    //                 navigate('/catalog/travel');
    //             }
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     setOnLogin(false);
    //     getData();
    // }, [onLogin])

    const googleLogin = async () => {
        // setOnLogin(true);
        const result = await signInWithPopup(auth, provide);

        if(result) {
            console.log(result);
            const user = result.user;
            dispatcher(register(user.displayName, user.email));
            dispatcher(loggedinwithgoogle(user.displayName, user.email, user.photoURL));
            navigate('/catalog/travel');
        }
    }

    // if(onLogin) {
    //     return null;
    // }
    // else {
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
