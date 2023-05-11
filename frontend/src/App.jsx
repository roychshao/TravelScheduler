import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loggedinwithgoogle } from './actions/loginAction.js'
import { onAuthStateChanged, signInWithCredential } from 'firebase/auth'
import { auth, provide } from './firebase.js'
import Login from './pages/Login/Login.jsx'
import Catalog from './pages/Catalog/Catalog.jsx'


function App() {

    const dispatcher = useDispatch();

    onAuthStateChanged(auth, (user) => {
        if(user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
        } else {
            // 如果localStorage中有資料 則重新將資料寫回redux store
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            if(currentUser) {
                dispatcher(loggedinwithgoogle(currentUser.displayName, currentUser.email, currentUser.photoURL));
            }
        }
    })

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
