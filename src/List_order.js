import './List_order.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import Popup from './Popup';
function List_order(){
    const [order,setOrder]=useState([])
    const [check,setCheck]=useState([])
    const [sum, setSum] = useState(0)
    const [total, setTotal] = useState(0)
    const [buttonPopup, setButtonPopup] = useState(false);
    useEffect(()=>{
        console.log("request to api")
        axios.get("http://127.0.0.1:5000/order")
        .then(response=>{
            setOrder(response.data)
        }).catch(error => {
            console.error('Error fetching data:', error);
        })

        axios.get("http://127.0.0.1:5000/total/order")
        .then(response=>{
            setSum(response.data)
        }).catch(error => {
            console.error('Error fetching data:', error);
        })

    },[])
    const onClickDeleteOrder=(id)=>{
        axios.delete("http://127.0.0.1:5000/order/"+id)
        .then((response) => {
            setOrder(response.data);
        })
        axios.get("http://127.0.0.1:5000/total")
        .then(response=>{
            setSum(response.data)
        }).catch(error => {
            console.error('Error fetching data:', error);
        })
        window.location.reload();
    }
    const show_order = order.map((item) => {
        return <div className="grid_order">
            <text>{item.name}</text><text className='Text-in-order'>{item.price}</text>
            <button onClick={onClickDeleteOrder.bind(this, item._id)} >ลบ</button>
        </div>
    })
    const onClickSubmit=()=>{
        axios.delete("http://127.0.0.1:5000/order")
        .then((response) => {
            setOrder(response.data);
            setSum(0)
        })
        console.log(order)
        // console.log(check)

    }

    const handlePopupClose = () => {
        setButtonPopup(false);
        axios.get("http://127.0.0.1:5000/total/check")
        .then((response) => {
            setTotal(response.data);
            console.log(total)
        })
    };
    const onClickPay=()=>{
        setButtonPopup(true)
        axios.get("http://127.0.0.1:5000/check")
        .then((response) => {
            setCheck(response.data);
            console.log(check)
        })
    }

    return(
        <>
        <div className='background-order'>
            <nav className='nav-background'>
                <h1 className = "App-text">ตะกร้า</h1>
            </nav>
            <div className='grid_order'>

                <h2>เมนูอาหาร</h2> <h2>ราคา</h2> <text></text>
            </div>
            {show_order}
            <text ></text><text></text>
            <text ></text><text></text>
            <text ></text><text></text>
            <div className='grid_order'>
                <text >ยอดชำระ</text><text></text><text className='Text-in-order'>{sum}</text>
            </div>
            <button className = "button-order" onClick={onClickSubmit.bind()} >สั่งอาหาร</button>
            <button className = "button-pay" onClick={onClickPay.bind()} >ชำระเงิน</button>
            {/* <button className = "button" onClick={onClickSum.bind()} >Sum</button> */}
        </div>
        {/* <Popup trigger={buttonPopup} setTrigger={setButtonPopup} onClose={handlePopupClose} /> */}
        </>
    )
}
export default List_order;