import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Map from './component/Map/Map.jsx'
import Trace from './component/Trace/Trace.jsx'
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
  }
});



const TravelDetail = () => {
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const loginWithGoogle = useSelector(state => state.loginReducer.loginWithGoogle);
  const [showMap, setShowMap] = useState(false);
  const [travelMode, setTravelMode] = useState('');
  const [showTrace, setShowTrace] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [spotTransportation, setSpotTransportation] = useState('');
  const [steps, setSteps] = useState(
    [
      {
        label: '地點一',
        description: `For each ad campaign that you create, you can control how much
                    you're willing to spend on clicks and conversions, which networks
                    and geographical locations you want your ads to show on, and more.`,
      },
      {
        label: '地點二',
        description:
          'An ad group contains one or more ads which target a shared set of keywords.',
      },
      {
        label: '地點三',
        description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
      },
    ]
  );

  const classes = useStyles();

  const callMap = () => {
    setShowMap(true);
  };
  const closeMap = () => {
    setShowMap(false);
  };

  

  //改交通工具資訊
  const handleChange = (event) => {
    setTravelMode(event.target.value);
    setSpotTransportation(event.target.value);
  };

  //開關路徑
  const callTrace = () => {
    setShowTrace(true);
  };
  const closeTrace = () => {
    setShowTrace(false);
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
    <div>
      <p>This is the Travel detail page</p>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
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
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>

      <button onClick={callMap}>新增地點</button>
      <button onClick={callTrace}>查看路徑</button>
      {showMap && (
        <div className={classes.map}>
          <span className={classes.closeButton} onClick={closeMap}>&times;</span>
          <div className={classes.mapContent}>
            <Map close={closeMap} />
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
    </div>
  );
}

export default TravelDetail