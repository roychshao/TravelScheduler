import React, { useEffect, useState } from 'react';
import '../../../../../../config.js';
import Map_Detail from './MapDetail.jsx';
import ArriveTime from '../Time/ArriveTime.jsx';
import StartTime from '../Time/StartTime.jsx';
import { makeStyles } from '@mui/styles';
import { createspot } from '../../../../../actions/spotAction.js';
import { useDispatch, useSelector } from 'react-redux'

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
    width: 400,
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

const Map = ({close}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [clickPlace, setClickPlace] = useState({
    name: null,
    lat: null,
    lng: null,
    rating: null,
    openingHours: null,
    types: []
  });
  const [showStartTime, setShowStartTime] = useState(false);
  const [showArriveTime, setShowArriveTime] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [arriveTime, setArriveTime] = useState(null);
  const [selectedPlaceInfo, setSelectedPlaceInfo] = useState(null);
  const [showSelectedPlaceInfo, setShowSelectedPlaceInfo] = useState(false);

  const classes = useStyles();
  //const openingHoursString = JSON.stringify(selectedPlaceInfo.openingHours);

  // dispatcher(
  //           createspot(
  //             selectedPlaceInfo.name,   //(string)
  //             selectedPlaceInfo.lat,    //(float)
  //             selectedPlaceInfo.lng,    //(float)
  //             selectedPlaceInfo.rating, //(float)
  //             openingHoursString, //填寫適當的 spotOpenhour 值    (string)
  //             selectedPlaceInfo.types, //填寫適當的 spotTagName 值     (string)
  //             startTime, //填寫適當的 spotStartTime 值   (string)
  //             arriveTime  //填寫適當的 spotArriveTime 值  (string)
  //           )
  //);

  const panelClose = () => {
    setShowPanel(false);
  };

  const modalClose = () => {
    close();
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
      fields: ['name', 'geometry', 'rating', 'opening_hours', 'types']
    };

    placesService.getDetails(request, (placeDetails, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const openingHours = placeDetails.opening_hours;
        // if (openingHours) {
        //   console.log('營業時間：');
        //   openingHours.weekday_text.forEach((weekdayText) => {
        //     console.log(weekdayText);
        //   });
        // } else {
        //   console.log('沒有提供營業時間資訊。');
        // }
        const clickPlace = {
          name: place.name,
          lat: placeDetails.geometry.location.lat(),
          lng: placeDetails.geometry.location.lng(),
          rating: placeDetails.rating,
          openingHours: openingHours ? openingHours.weekday_text : '無營業時間',
          types: placeDetails.types[0]
        };
  
        setClickPlace(clickPlace);

        setSelectedPlaceInfo({
          name: place.name,
          lat: placeDetails.geometry.location.lat(),
          lng: placeDetails.geometry.location.lng(),
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
    setShowSelectedPlaceInfo(true);
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
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleSearch}>搜尋</button>
      </div>

      {selectedPlaceInfo && showSelectedPlaceInfo && (
        <div>
          <p>地點名稱: {selectedPlaceInfo.name}</p>
          <p>地點經度: {selectedPlaceInfo.lng}</p>
          <p>地點緯度: {selectedPlaceInfo.lat}</p>
          <p>地點評價: {selectedPlaceInfo.rating}</p>
          <p>地點營業時間: {selectedPlaceInfo.openingHours}</p>
          <p>地點類型: {selectedPlaceInfo.types}</p>
          <p>抵達時間: {startTime}</p>
          <p>離開時間: {arriveTime}</p>
          <button onClick={callStartTime}>選擇抵達時間</button>
          <button onClick={callArriveTime}>選擇離開時間</button>
          <br/>
          {startTime && arriveTime && (
            <button onClick={close}>確定</button>
          )}
        </div>
      )}
      <br />
      {showMap && (
        <div id="map" style={{ height: '400px', width: '100%' }}></div>
      )}
      
      {showPanel &&(
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            <Map_Detail onCancel={panelClose} onConfirm={handleConfirm} place={clickPlace}/>
          </div>
        </div>
      )}
      
      {showStartTime && (
        <div className={classes.time}>
          <span className={classes.closeButton} onClick={closeStartTime}>&times;</span>
          <div className={classes.timeContent}>
            <StartTime Close={closeStartTime} updateStartTime={updateStartTime}/>
          </div>
        </div>
      )}

      {showArriveTime && (
        <div className={classes.time}>
          <span className={classes.closeButton} onClick={closeArriveTime}>&times;</span>
          <div className={classes.timeContent}>
            <ArriveTime Close={closeArriveTime} updateArriveTime={updateArriveTime}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
