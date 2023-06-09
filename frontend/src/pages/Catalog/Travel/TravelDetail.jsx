import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Map from '../Map/Map.jsx'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', /* 半透明黑色背景 */
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 4,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      width: 1200,
      height: 500
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      fontSize: 24,
      color: '#555',
      cursor: 'pointer'
    },
    closeButtonHover: {
      color: '#000'
    }
});

const TravelDetail = () => {
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const loginWithGoogle = useSelector(state => state.loginReducer.loginWithGoogle);
    const [showModal, setShowModal] = useState(false);
    const classes = useStyles();
    
    const callMap = () => {
        setShowModal(true);
      };
    
      const closeModal = () => {
        setShowModal(false);
      };
    
    return (
        <div>
            <p>This is the Travel detail page</p>
            <button onClick={callMap}>新增地點</button>
            {showModal && (
                <div className={classes.modal}>
                    <span className={classes.closeButton} onClick={closeModal}>&times;</span>
                    <div className={classes.modalContent}>
                        <Map close={closeModal}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TravelDetail
