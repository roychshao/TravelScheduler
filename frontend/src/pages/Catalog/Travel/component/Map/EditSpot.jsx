import React, { useEffect, useState } from 'react';
import '../../../../../../config.js';
import Map_Detail from './MapDetail.jsx';
import ArriveTime from '../Time/ArriveTime.jsx';
import StartTime from '../Time/StartTime.jsx';
import { makeStyles } from '@mui/styles';
import { Button, TextField, FormControl, Select, InputLabel, MenuItem} from '@mui/material'
import { getTravelSpots, updatespot } from '../../../../../actions/spotAction.js';

import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';

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
    width: 300,
    height: 100
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
  time: {
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
  timeContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 4,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    width: 150,
    height: 90
  }
});

const EditSpot = ({close, index, travelid}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showArriveTime, setShowArriveTime] = useState(false);

  const classes = useStyles();  

  const dispatcher = useDispatch();

  //call /api/spot/get2
  const spotFromBackend = useSelector(state => state.spotReducer.spots);
  useEffect(() => {
    dispatcher(getTravelSpots(travelid));
  },[travelid])
  const [selectedPlaceInfo, setSelectedPlaceInfo] = useState({
    arrive_id: spotFromBackend[0][index].arrive_id,
    has_id: spotFromBackend[0][index].has_id,
    spot_id: spotFromBackend[0][index].spot_id,
    name: spotFromBackend[0][index].spot_name,
    lat: spotFromBackend[0][index].spot_latitude,
    lng: spotFromBackend[0][index].spot_longtitude,
    location: spotFromBackend[0][index].spot_location,
    rating: spotFromBackend[0][index].spot_rank,
    types: spotFromBackend[0][index].spot_tag_name,
    openingHours: spotFromBackend[0][index].spot_openhour,
    transportation: spotFromBackend[0][index].spot_transportation,
    start_time: spotFromBackend[0][index].spot_start_time,
    arrive_time: spotFromBackend[0][index].spot_arrive_time,
    description: spotFromBackend[0][index].spot_description
  });
  const preStartDateTime = new Date(selectedPlaceInfo.start_time);
  const preStartTime = preStartDateTime.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
  const [startTime, setStartTime] = useState(preStartTime);

  const preArriveDateTime = new Date(selectedPlaceInfo.arrive_time);
  const preArriveTime = preArriveDateTime.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
  const [arriveTime, setArriveTime] = useState(preArriveTime);

  const passToBackend = () => {
    const openingHoursString = JSON.stringify(selectedPlaceInfo.openingHours);
    const startTimeStr = moment(startTime, 'h:mm A');
    const arriveTimeStr = moment(arriveTime, 'h:mm A');
    const startTimeFormatted = startTimeStr.format('YYYY-MM-DD HH:mm:ss');
    const arriveTimeFormatted = arriveTimeStr.format('YYYY-MM-DD HH:mm:ss');
    console.log(startTimeFormatted);
    console.log(arriveTimeFormatted);
   

    //要改成用edit api
    dispatcher(
      updatespot(
        selectedPlaceInfo.has_id,
        selectedPlaceInfo.spot_id,
        selectedPlaceInfo.description,
        selectedPlaceInfo.types,      //填寫適當的 spotTagName 值     (string)
        selectedPlaceInfo.transportation,
        startTimeFormatted,           //填寫適當的 spotStartTime 值   (datetime)
        arriveTimeFormatted,          //填寫適當的 spotArriveTime 值  (datetime)
        selectedPlaceInfo.arrive_id,
        travelid
      )
    );
    close();
  }
  

  const panelClose = () => {
    setShowPanel(false);
  };

  //StartTime介面
  const callStartTime = () => {
    setShowStartTime(true);
  };
  const closeStartTime = () => {
    setShowStartTime(false);
  };
  //更新Start的時間
  const updateStartTime = (time) => {
    setStartTime(time);
    console.log(time);
  };

  //ArriveTime介面
  const callArriveTime = () => {
    setShowArriveTime(true);
  };
  const closeArriveTime = () => {
    setShowArriveTime(false);
  };
  //更新Arrive的時間
  const updateArriveTime = (time) => {
    setArriveTime(time);
    console.log(time);
  };

  const handleSearch = async () => {
    if (!searchLocation) return;

    setShowMap(true);

    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const map = new window.google.maps.Map(mapElement, {
      zoom: 16,
      center: searchLocation,
    });

    const placesService = new window.google.maps.places.PlacesService(map);

    const callback = (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    const createMarker = (place) => {
      const marker = new window.google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
      });

      marker.addListener('click', () => {
        handleMapClick(place);
      });
    }
  
    const request = {
      location: searchLocation,
      radius: '500',
      query: searchQuery,
    };

    placesService.textSearch(request, callback);
  };

  const handleMapClick = (place) => {
    setShowPanel(true);

    const placesService = new window.google.maps.places.PlacesService(map);
    const request = {
      placeId: place.place_id,
      fields: ['name', 'geometry', 'rating', 'opening_hours', 'types', 'formatted_address']
    };

    placesService.getDetails(request, (placeDetails, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const openingHours = placeDetails.opening_hours;
        const clickPlace = {
          name: place.name,
          lat: placeDetails.geometry.location.lat(),
          lng: placeDetails.geometry.location.lng(),
          location: placeDetails.formatted_address,
          rating: placeDetails.rating,
          openingHours: openingHours ? openingHours.weekday_text : '無營業時間',
          types: placeDetails.types[0]
        };
  
        setClickPlace(clickPlace);

        setSelectedPlaceInfo({
          name: place.name,
          lat: placeDetails.geometry.location.lat(),
          lng: placeDetails.geometry.location.lng(),
          location: placeDetails.formatted_address,
          rating: placeDetails.rating,
          types: placeDetails.types[0],
          openingHours: openingHours ? openingHours.weekday_text : '無營業時間'
        });
      } else {
        console.log("ERROR: Google Map Status not OK");
      }
    });
  };

  const handleConfirm = (placeInfo) => {
    setSelectedPlaceInfo(placeInfo);
  };

  useEffect(() => {
    if (searchQuery !== '') {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: searchQuery }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          const location = results[0].geometry.location;
          setSearchLocation(location);
        }
      });
    }
  }, [searchQuery]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
    `https://maps.googleapis.com/maps/api/js?key=${window.REACT_APP_API_KEY}&libraries=places`;     
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      console.log('Google Maps API 加載完成');
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (searchLocation && showMap) {
      handleSearch();
    }
  }, [searchLocation, showMap]);

  useEffect(() => {
    if (searchLocation) {
      const mapElement = document.getElementById('map');
      if (!mapElement) return;

      const map = new window.google.maps.Map(mapElement, {
        zoom: 16,
        center: searchLocation,
      });

      map.addListener('click', handleMapClick);

      return () => {
        google.maps.event.clearListeners(map, 'click');
      };
    }
  }, [searchLocation]);

  return (
    <div>
      <h3>My Google Maps Demo</h3>

      {selectedPlaceInfo && (
        <div>
          <p>地點名稱: {selectedPlaceInfo.name}</p>
          <p>地點經度: {selectedPlaceInfo.lng}</p>
          <p>地點緯度: {selectedPlaceInfo.lat}</p>
          <p>地點地址: {selectedPlaceInfo.location}</p>
          <p>地點評價: {selectedPlaceInfo.rating}</p>
          <p>地點營業時間: {selectedPlaceInfo.openingHours}</p>
          <p>地點類型: {selectedPlaceInfo.types}</p>

          <p>抵達時間: {startTime}</p>
          <p>離開時間: {arriveTime}</p>
          <Button onClick={callStartTime} variant="outlined" color="info" style={{ marginRight: '10px' }}>選擇抵達時間</Button>
          <Button onClick={callArriveTime} variant="outlined" color="info">選擇離開時間</Button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p>選擇交通工具: </p>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Travel Mode</InputLabel>
              <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedPlaceInfo.transportation}
              label="TravelMode"
              onChange={(e) =>
                setSelectedPlaceInfo((prevState) => ({
                  ...prevState,
                  transportation: e.target.value
                }))}
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
          </div>
          <br/>
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={selectedPlaceInfo.description}
            onChange={(e) => setSelectedPlaceInfo((prevState) => ({
              ...prevState,
              description: e.target.value
            }))}
          />
          {startTime && arriveTime && (
            <Button onClick={passToBackend} variant="outlined" color="success" style={{ marginTop: '10px' }}>確定</Button>
          )}
        </div>
      )}
      <br />
      
      {showStartTime && (
        <div className={classes.time}>
          <div className={classes.timeContent}>
              <StartTime Close={closeStartTime} updateStartTime={updateStartTime}/>
          </div>
        </div>
      )}

      {showArriveTime && (
        <div className={classes.time}>
          <div className={classes.timeContent}>
              <ArriveTime Close={closeArriveTime} updateArriveTime={updateArriveTime}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditSpot;
