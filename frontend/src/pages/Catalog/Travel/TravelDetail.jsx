import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Map from './component/Map/Map.jsx'
import Trace from './component/Trace/Trace.jsx'
import EditSpot from './component/Map/EditSpot.jsx'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  map: {
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
  mapContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 4,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    width: 1200,
    height: 500,
    maxHeight: '400px', /* 容器的最大高度 */
    overflowY: 'auto', /* 添加垂直滾動條 */
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
  },
  trace: {
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
  traceContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 4,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    width: 1200,
    height: 500
  },
  travelContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 4,
    width: 1470,
    height: 800,
    maxHeight: '2000px', /* 容器的最大高度 */
    overflowY: 'auto', /* 添加垂直滾動條 */
  },
  editSpot: {
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
  editSpotContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 4,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    width: 1200,
    height: 500
  }
});



const TravelDetail = ({travel}) => {
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const loginWithGoogle = useSelector(state => state.loginReducer.loginWithGoogle);
  const [showMap, setShowMap] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState(null); 
  const [travelMode, setTravelMode] = useState('');
  const [showTrace, setShowTrace] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [spotTransportation, setSpotTransportation] = useState('');
  const [steps, setSteps] = useState([]);
  const [showEditSpot, setShowEditSpot] = useState(false);
  const classes = useStyles();

  const callMap = () => {
    setShowMap(true);
    setSelectedTravel(travel);
  };
  const closeMap = () => {
    setShowMap(false);
  };

  const onPlaceConfirmed = (selectedPlaceInfo) => {
    const newStep = { label: selectedPlaceInfo.name }; // 创建新的步骤对象
  
    setSteps((prevSteps) => [...prevSteps, newStep]); // 将新步骤添加到步骤数组中
  };

  //改交通工具資訊
  const handleChange = (event) => {
    setTravelMode(event.target.value);
    setSpotTransportation(event.target.value);
  };

  //進入查看路徑
  const callTrace = () => {
    setShowTrace(true);
  };
  const closeTrace = () => {
    setShowTrace(false);
  };

  //進入編輯地點頁面
  const callEditSpot = () => {
    setShowEditSpot(true);
  };
  const closeEditSpot = () => {
    setShowEditSpot(false);
  };

  //整個行程架構
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.travelContent}> 
      <p>This is the Travel detail page</p>

      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {activeStep !== steps.length - 1 && (
                <div>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Travel Mode</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={travelMode}
                      label="TravelMode"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={'DRIVING'}>開車</MenuItem>
                      <MenuItem value={'WALKING'}>步行</MenuItem>
                      <MenuItem value={'BICYCLING'}>腳踏車</MenuItem>
                      <MenuItem value={'TRANSIT'}>大眾運輸</MenuItem>
                      <MenuItem value={'TWO_WHEELER'}>機車</MenuItem>
                    </Select>
                  </FormControl>
                  <br/>
                  <Button onClick={callTrace} variant="outlined" color="info" size="small" style={{ marginLeft: '10px', marginBottom: '10px' }}>查看路徑</Button>
                </div>  
              )}
              <Button onClick={callEditSpot} variant="outlined" color="warning" size="small" style={{ marginLeft: '10px' }}>編輯地點</Button>
              <Button  variant="outlined" color="error" size="small" style={{ marginLeft: '10px' }}>刪除地點</Button>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? '完成' : '下一個地點'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    前一個地點
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length &&  steps.length !=0 && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>恭喜你完成旅程</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
      )}
      <Button onClick={callMap} variant="outlined" color="secondary" style={{ marginBottom: '10px' }}>新增地點</Button>
      <br/>
      <Button variant="contained" color="success" size="large" style={{ marginRight: '10px' }}>確定</Button>
      <Button variant="contained" color="error" size="large">取消</Button>

      {showMap && (
        <div className={classes.map}>
          <span className={classes.closeButton} onClick={closeMap}>&times;</span>
          <div className={classes.mapContent}>
            <Map close={closeMap} insertPlace={onPlaceConfirmed}/>
          </div>
        </div>
      )}

      {showTrace && (
        <div className={classes.trace}>
          <span className={classes.closeButton} onClick={closeTrace}>&times;</span>
          <div className={classes.traceContent}>
            <Trace />
          </div>
        </div>
      )}

      {showEditSpot && (
        <div className={classes.editSpot}>
          <span className={classes.closeButton} onClick={closeEditSpot}>&times;</span>
          <div className={classes.editSpotContent}>
            <EditSpot close={closeEditSpot}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default TravelDetail