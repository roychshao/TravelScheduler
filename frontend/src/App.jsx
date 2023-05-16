import { Routes, Route, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { register, getUser } from './actions/loginAction.js'
// import { onAuthStateChanged, signInWithCredential } from 'firebase/auth'
// import { auth, provide } from './firebase.js'
import Login from './pages/Login/Login.jsx'
import Catalog from './pages/Catalog/Catalog.jsx'


function App() {

    // const dispatcher = useDispatch();
    // const navigate = useNavigate();
    // const userId = useSelector(state => state.loginReducer.userId);

    // 因firebase登入持久化對不同瀏覽器的效果不同,因此使用localStorage處理

    // onAuthStateChanged(auth, (user) => {
        // if(user) {
        //     console.log("firebase auth return user");
        //     localStorage.setItem("currentUser", JSON.stringify(user));
        //     dispatcher(loggedinwithgoogle(user.displayName, user.email, user.photoURL));
        // } else {
            // 如果localStorage中有資料 則重新將資料寫回redux store
            // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            // if(currentUser) {
            //     dispatcher(loggedinwithgoogle(currentUser.displayName, currentUser.email, currentUser.photoURL));
            // }
        // }
    // })

    return (
        <div>
            <div>
                <Routes>
                    <Route path="/catalog/*" element={<Catalog/>}/>
                    <Route path="/" element={<Login/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App
