import React from 'react'
import './Popup.css'
import { useState, useEffect } from 'react';
import axios from "axios";
function Popup(props){ 
    const show_check = props.order.map(item => (
        <div key={item._id} className='grid-in-check'>
            <text className='text-nameMenu'>{item.name}</text><text>{item.price} บาท</text>
            <br />
        </div>
    ))
    return (props.trigger) ? (
        <div className="popup-inner">
            <p>ใบเสร็จ</p>
            <div className="setPosition-button">
            </div>
            {show_check}
            <div className='grid-in-check'>
                <text className='text-nameMenu'>ยอดชำระ</text><text>{props.sum} บาท</text>
            </div>
            {props.chidren}
            {/* <p></p> */}
            <br/>
            <br/>
            <button className="close-btn" onClick={() => props.setTrigger(false)}>
                ชำระเงิน เสร็จแล้ว
            </button>
        </div> 
    ): "";
}
export default Popup;