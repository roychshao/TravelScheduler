import React, {useState, useEffect} from 'react';

const Map_Detail = ({ onCancel, place, onCancelAll }) => {
    const cancel = () => {
        onCancel();
    }

    const enter = () => {
        console.log('點擊的店家名稱:', place.name);
        console.log('點擊位置的經度:', place.geometry.location.lng());
        console.log('點擊位置的緯度:', place.geometry.location.lat());
        console.log('店家的地址:', place.formatted_address);
        console.log('店家的類型:', place.types);
        console.log('店家的評價:', place.rating);
        console.log('店家的營業時間:', place.opening_hours);
        onCancel();
        onCancelAll();
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