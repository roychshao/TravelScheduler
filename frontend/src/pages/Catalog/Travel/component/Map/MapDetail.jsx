import React, {useState, useEffect} from 'react';
import { createspot } from '../../../../../actions/spotAction.js';
import { useDispatch, useSelector } from 'react-redux'

const Map_Detail = ({ onCancel, place, onConfirm }) => {
    const cancel = () => {
        onCancel();
    }
    const dispatcher = useDispatch();

    const enter = () => {
        // dispatcher(
        //     createspot(
        //         place.name,
        //         `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`,
        //         place.rating,
        //         place.opening_hours,
        //         '', // 填寫適當的 spotDescription 值
        //         '' // 填寫適當的 spotTagId 值
        //     )
        // );
        onConfirm({
            name: place.name,
            lat: place.lat,
            lng: place.lng,
            rating: place.rating,
            types: place.types,
            openingHours: place.openingHours
        });
        console.log('點擊的店家名稱:', place.name);
        console.log('點擊位置的經度:', place.lng);
        console.log('點擊位置的緯度:', place.lat);
        console.log('店家的類型:', place.types);
        console.log('店家的評價:', place.rating);
        if(place.openingHours){
            console.log('營業時間：');
            console.log(place.openingHours);
            // place.openingHours.forEach((weekdayText) => {
            //     console.log(weekdayText);
            // });
        } else {
          console.log('沒有提供營業時間資訊。');
        }

        onCancel();
        //onCancelAll();
    }

    return (
        <div>
            <h1>是否要將此地點加入Travel</h1>
            <button style={{ marginRight: '10px' }} onClick={enter}>確定</button>
            <button onClick={cancel}>取消</button>
        </div>
    )
}

export default Map_Detail;