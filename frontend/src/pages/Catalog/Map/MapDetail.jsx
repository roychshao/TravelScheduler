import React, {useState, useEffect} from 'react';

const Map_Detail = ({ onCancel }) => {
    const cancel = () => {
        onCancel();
    }
    return (
        <div>
            <h1>是否要將此地點加入Travel</h1>
            <button style={{ marginRight: '10px' }}>確定</button>
            <button onClick={cancel}>取消</button>
        </div>
    )
}

export default Map_Detail;