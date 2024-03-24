import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import axios from "axios";

function Meat() {
    const [buttonPopup, setButtonPopup] = useState(false);
    const [meat, setMeat] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const onClickSelect = (id) => {
        setButtonPopup(true);
        console.log({ id });
    };

    useEffect(() => {
        console.log("request to api");
        axios.get("http://127.0.0.1:5000/products")
            .then(response => setMeat(response.data))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handlePopupClose = () => {
        setButtonPopup(false);
    };

    const filteredMeat = meat.filter(item => {
        // Filter based on search query, you can customize this logic as needed
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search meat"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
            <div className="App-grid">
                {filteredMeat.map(item => (
                    <div key={item._id} className="App-background-image">
                        <p className="App-descript1">{item.name}<br /> {item.price} บาท</p>
                        <img className="App-image" src={item.image} alt={item.name} />
                        <br />
                        <button onClick={() => onClickSelect(item._id)} className="App-descript2">เพิ่มลงในตะกร้า</button>
                    </div>
                ))}
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup} onClose={handlePopupClose} />
            </div>
        </div>
    );
}

export default Meat;
