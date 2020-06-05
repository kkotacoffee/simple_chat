import React from 'react';
import './index.css';

// 人の画像を表示する関数
// 画像は public/images に 「ユーザー番号.jpg」 の形式で用意

function ShowImage (props){

    return (
      <div>
        <img src={`${process.env.PUBLIC_URL}/images/${props.num}.jpg`} alt="Logo" style = {props.style}/>
      </div>
    );
}

export default ShowImage;