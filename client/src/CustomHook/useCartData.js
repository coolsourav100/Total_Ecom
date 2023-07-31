import { useState, useEffect } from 'react';
import axios from 'axios';

const useCartData = () => {
  const [cartData, setCartData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to send data to the server and update the state
  const sendDataToServer = async (data) => {
    
    try {
      let res = await axios.post('http://localhost:4000/cart/update', data);
      console.log(res)
      // On successful data update on the server, update the state locally
      setCartData(data.cartData);
      setTotalItems(data.totalItems);
      setTotalPrice(data.totalPrice);
    } catch (error) {
      console.error('Error sending cart data to the server:', error);
    }
  };

  // Function to get data from the server and set it in the state
  const getDataFromServer = async () => {
    try {
      const response = await axios.get('http://localhost:4000/cart/get');
      if(response.data.length>0){
        console.log(response,'useCartData Hook')
      setCartData(response.data[0].cartData);
      setTotalItems(response.data[0].totalItems);
      setTotalPrice(response.data[0].totalPrice);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    getDataFromServer();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  // Return the state and any additional functions needed
  return {
    cartData,
    totalItems,
    totalPrice,
    sendDataToServer, // Function to send data to the server and update the state
  };
};

export default useCartData;