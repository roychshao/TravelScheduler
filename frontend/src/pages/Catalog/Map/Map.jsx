import React, { useEffect, useState } from 'react';
import Map_Detail from './MapDetail';
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
  }
});

const Map = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const classes = useStyles();

  const panelClose = () => {
    setShowPanel(false);
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
    console.log('點擊的店家名稱:', place.name);
    console.log('點擊位置的經度:', place.geometry.location.lng());
    console.log('點擊位置的緯度:', place.geometry.location.lat());
    console.log('店家的地址:', place.formatted_address);
    console.log('店家的類型:', place.types);
    console.log('店家的評價:', place.rating);
    console.log('店家的營業時間:', place.opening_hours);
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
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyC_Sct7uHnPVrkCRLtKW45MdjrL3-QZCoA&libraries=places';
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
      <br />
      {showMap && (
        <div id="map" style={{ height: '400px', width: '100%' }}></div>
      )}
      {showPanel &&(
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            <Map_Detail onCancel={panelClose}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
