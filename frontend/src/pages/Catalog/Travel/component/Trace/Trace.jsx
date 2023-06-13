import React, { useEffect, useState } from 'react';
import '../../../../../../config.js';
import { createBootstrapComponent } from 'react-bootstrap/esm/ThemeProvider';

const Trace = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src =
        `https://maps.googleapis.com/maps/api/js?key=${window.REACT_APP_API_KEY}&libraries=places`;     
        script.defer = true;
        document.head.appendChild(script);
    
        script.onload = () => {
          console.log('Google Maps API 加載完成');
          createTrace();
        };
    
        return () => {
          document.head.removeChild(script);
        };
    }, []);

    const createTrace = () => {
        // 創建地圖
        const map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: 37.7749, lng: -122.4194 }, // 地圖中心座標
          zoom: 12, // 地圖縮放程度
        });
    
        // 创建起点和终点的标记
        const startMarker = new google.maps.Marker({
          position: { lat: 37.7749, lng: -122.4194 }, // 設置起點座標
          map: map,
          //label: 'Start', // 設置標記
        });
    
        const endMarker = new google.maps.Marker({
          position: { lat: 37.7749, lng: -122.4316 }, // 設置終點座標
          map: map,
          //label: 'End', // 設置標記
        });
    
        // 獲取路線
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
    
        const request = {
          origin: { lat: 37.7749, lng: -122.4194 }, // 起點座標
          destination: { lat: 37.7749, lng: -122.4316 }, // 終點座標
          travelMode: 'DRIVING', // 交通方式
        };
    
        directionsService.route(request, function (result, status) {
          if (status === 'OK') {
            // 在地圖上繪製路線
            directionsRenderer.setDirections(result);
            directionsRenderer.setMap(map);
          }
        });
    };
    
    return <div id="map" style={{ height: '400px' }}></div>;
}

export default Trace