import React from 'react';
import './App.css';
import './List_order';
import Popup from './Popup';
import { useState, useEffect } from 'react';
import axios from "axios";

function App() {
	const [buttonPopup, setButtonPopup] = useState(false);
	const [meat, setMeat] = useState([])
	const [searchQuery, setSearchQuery] = useState('');
    const [order,setOrder]=useState([])
    const [check,setCheck]=useState([])
    const [sum, setSum] = useState(0)
    const [total, setTotal] = useState(0)

	useEffect(() => {
		console.log("request to api")
		axios.get("http://127.0.0.1:5000/products")
			.then(response => setMeat(response.data))
			.catch(error => {
				console.error('Error fetching data:', error);
			})
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
	}, [])
	const onClickSelect = (id) => {
		axios.post("http://127.0.0.1:5000/order/" + id)
		.then(response=>{
			setOrder(response.data)
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		})
        axios.get("http://127.0.0.1:5000/total/order")
        .then(response=>{
            setSum(response.data)
        }).catch(error => {
            console.error('Error fetching data:', error);
        })
	};
    const handlePopupClose = () => {
        setButtonPopup(false);
        axios.get("http://127.0.0.1:5000/total/check")
        .then((response) => {
            setTotal(response.data);
            console.log(total)
        })
    };
    const onClickDeleteOrder=(id)=>{
		axios.delete("http://127.0.0.1:5000/order/" + id)
		.then(response=>{
			setOrder(response.data)
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		})
        axios.get("http://127.0.0.1:5000/total/order")
        .then(response=>{
            setSum(response.data)
        })
        axios.get("http://127.0.0.1:5000/total/order")
        .then(response=>{
            setSum(response.data)
        })
    }
    const onClickPay=()=>{
        setButtonPopup(true)
        axios.get("http://127.0.0.1:5000/check")
        .then((response) => {
            setCheck(response.data);
            console.log(check)
        })
		axios.get("http://127.0.0.1:5000/total/check")
		.then(response=>{
			setTotal(response.data)
		}).catch(error => {
			console.error('Error fetching data:', error);
		})
		axios.get("http://127.0.0.1:5000/total/check")
		.then(response=>{
			setTotal(response.data)
		}).catch(error => {
			console.error('Error fetching data:', error);
		})
    }
    const onClickSubmit=()=>{
        axios.delete("http://127.0.0.1:5000/order")
        .then((response) => {
            setOrder(response.data);
            setSum(0)
        })
        console.log(order)
        // console.log(check)
    }
	const filteredMeat = meat.filter(item => {
		// Filter based on search query, you can customize this logic as needed
		return item.name.toLowerCase().includes(searchQuery.toLowerCase());
	});
    const show_order = order.map((item) => {
        return <div className="grid_order">
            <text>{item.name}</text><text className='Text-in-order'>{item.price}</text>
            <button onClick={onClickDeleteOrder.bind(this, item._id)} >ลบ</button>
        </div>
    })
	const show_meat = filteredMeat.map(item => {
		return (<div key={item._id} className="App-background-image">
			<p className="App-descript1">{item.name}<br /> {item.price} บาท</p>
			<img className="App-image" src={item.image} alt={item.name} />
			<br />
			<button onClick={() => onClickSelect(item._id)} className="App-descript2">เพิ่มลงในตะกร้า</button>
		</div>)
	});
	return (
		<div>
			<div className="popup1">
				<Popup trigger={buttonPopup} order={check} sum = {total} setTrigger={setButtonPopup} onClose={handlePopupClose} />
				{/* <Popup trigger={true} /> */}
			</div>

			<div className="App-background1"></div>
			<div className='grid'>
				<div>
					{/* <Meat /> */}
					<div>
						<div className="search-container">
							<text>Food Order </text>
							
							<input
								type="text"
								placeholder="Search meat"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="search-input"
							/>
						</div>
						<div className="App-grid">
							{show_meat}
						</div>
					</div>
				</div>
				<div>
					{/* <List_order /> */}
					<div className='background-order'>
						<nav className='nav-background'>
							<h1 className = "App-text">ตะกร้า</h1>
						</nav>
						<div className='grid_order'>

							<h2>เมนูอาหาร</h2> <h2>ราคา</h2> <text></text>
						</div>
						{show_order}
						<div className='grid_order'>
							<text >ยอดชำระ</text><text></text><text className='Text-in-order'>{sum}</text>
						</div>
						<button className = "button-order" onClick={onClickSubmit.bind()} >สั่งอาหาร</button>
						<button className = "button-pay" onClick={onClickPay.bind()} >ชำระเงิน</button>
					</div>
					{/* <button>ชำระเงิน</button> */}
				</div>
			</div>
		</div>
	);
}

export default App;