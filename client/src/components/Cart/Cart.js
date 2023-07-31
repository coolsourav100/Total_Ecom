import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCartData, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../../Store/cartSlice'
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useCartData from '../../CustomHook/useCartData';
import axios from 'axios';
import { increment } from '../../Store/toggleSlice';

const Cart = () => {
  const { cartData, totalItems, totalPrice, sendDataToServer } = useCartData();
  const counter = useSelector((state) => state.counter.value);
  const location = useLocation()
  const dispatch = useDispatch();
  const cartData1 = useSelector((state) => state.cart);
  const [totalPay, setTotalPay] = useState(cartData1.totalPrice);
  const [discount, setDiscount] = useState(0);
  const [ toggle , setToggle] = useState(false)
  const [err , setErr] = useState('')
  const [coupon,setCoupon] = useState('');
  const [productId,setProductId] = useState();
  const [disC,setDisC] = useState();

  useEffect(() => {
    setCoupon(location.state)
    setProductId(location.prodId)
    setDisC(Number(location.dis))
  }, [totalPay ,location.state,toggle , counter]);

  useEffect(() => {
    fetchDataFromServer();
  }, [toggle,counter]);

  

  const fetchDataFromServer = async () => {
    try {
      const response = await axios.get('http://localhost:4000/cart/get');
      const { data } = response;
      dispatch(setCartData(data));
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const addQty = (itemId) => {
    dispatch(increaseQuantity(itemId));
    const itemToIncrease = cartData.find((item) => item._id === itemId);
    if (itemToIncrease) {
      sendDataToServer({
        cartData: cartData.map((item) =>
          item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        ),
        totalItems: totalItems + 1,
        totalPrice: totalPrice + Number(itemToIncrease.price),
      });
    }
    setToggle(!toggle)
  };

  const removeQty = (itemId) => {
    dispatch(decreaseQuantity(itemId));
    const itemToDecrease = cartData.find((item) => item._id === itemId);
    if (itemToDecrease) {
      const updatedQty = Math.max(itemToDecrease.quantity - 1, 0);
      if (updatedQty > 0) {
        const updatedCartData = cartData.map((item) =>
          item._id === itemId ? { ...item, quantity: updatedQty } : item
        );
        const updatedTotalItems = totalItems - 1;
        const updatedTotalPrice = totalPrice - Number(itemToDecrease.price);
        sendDataToServer({
          cartData: updatedCartData,
          totalItems: updatedTotalItems,
          totalPrice: updatedTotalPrice,
        });
      } else {
        const updatedCartData = cartData.filter((item) => item._id !== itemId);
        const updatedTotalItems = totalItems - 1;
        const updatedTotalPrice = totalPrice - Number(itemToDecrease.price);
        sendDataToServer({
          cartData: updatedCartData,
          totalItems: updatedTotalItems,
          totalPrice: updatedTotalPrice,
        });
      }
    }
    
    setTimeout(()=>setToggle(!toggle),10)
  };

  const removeFromCartData = (itemId) => {
    dispatch(removeFromCart(itemId));
    const itemToRemove = cartData.find((cartItem) => cartItem._id === itemId);
    if (itemToRemove) {
      const updatedTotalItems = totalItems - itemToRemove.quantity;
      const updatedTotalPrice = totalPrice - itemToRemove.quantity * Number(itemToRemove.price);
      const updatedCartData = cartData.filter((cartItem) => cartItem._id !== itemId);
      sendDataToServer({
        cartData: updatedCartData,
        totalItems: updatedTotalItems,
        totalPrice: updatedTotalPrice,
      });
    }
    dispatch(increment())
    setToggle(!toggle)
  };
 
  const couponForSpecificProduct = {
    productId:productId ,
    discount:disC,
  };

  const applyCoupon = () => {
    
    let res = cartData.filter((item)=>item._id==couponForSpecificProduct.productId)
    
    if (res.length>0) {
      let dicountPrice = Number(res[0].price)* Number(res[0].quantity)
      let dis = dicountPrice * Number(disC);
      setTotalPay(cartData1.totalPrice - dis);
      setDiscount(dis);
    }else{
      setErr('Coupon Not Applied for this Product')
    }
  };


  return (
    <div>
        <>
  <section className="cart">
    <div className="container">
      
      <div className="parent_order">
        <div className="left_order">
        <div className="od">
                      <h4>
                          ORDER DETAILS - <span> {cartData1.totalItems} Item(s) </span>{" "}
                      </h4>
                      </div>
        { cartData1?.cartData?.map((item,ind)=>{ 
         
            return(
          <div className="inner_left_order">
            
                      <div className="tsec">
                      
                     
                      <div className="msec">
                      <div className="limgmsec">
                      <img src={item.img} alt="girl" />
                      </div>
                      <div className="rcntntmsec">
                      <h5>Product Code : {item._id}</h5>
                      <p> Product Name : {item.name}</p>
                      <div className="df">
                      <p>NetWeight: {item.netWeight}</p>
                      </div>
                      <div className="df df-ltst">
                      <p>Quantity <button onClick={(e)=>removeQty(item._id)}>-</button> {item.quantity} <button onClick={(e)=>addQty(item._id)}>+</button> </p>
                      <button className="re" onClick={(e)=>removeFromCartData(item._id)} >
                      <span>
                      {" "}
                      <img src={require("../../assets/images/dustbin.png")} alt="dustbin" /> Remove{" "}
                      </span>
                      </button>
                      </div>
                      </div>
                      <div className="df">
                  
                      <p>
                        <b>₹{item.price}</b>
                        </p>
                      </div>
                      <p>Estimated ship date : 31th July 2023</p>
                      </div>
                </div>
            
          </div>)})}
          <div className="bsec">
            <p>
              {" "}
              <span /> Free Shipping , COD Avaliable, Easy 15 days Return Policy
              to be shown on Cart page
            </p>
          </div>
        </div>
        <div className="right_order">
          <div className="inner_r_order">
            <div className="brdr">
              <h4>What would you like to do next?</h4>
              <p>
                Choose if you have a discount code or reward points you want to
                use or would like to estimate your delivery cost.
              </p>
            </div>
            <div className="brdr">
              <div className="df rt">
                <h5>Bag Total</h5>
                <h5>₹ {cartData1.totalPrice}</h5>
              </div>
              <div className="df rt">
                <h5>Shipping Charges</h5>
                <h5>₹0</h5>
              </div>
              <div className="df rt">
                <h5>Taxes</h5>
                <h5>₹0</h5>
              </div>
              <div className="df rt">
                <p> Apply Coupon Codes on payments page </p>
                <p style={{color:'red'}}>{err ? err : null}</p>
                {cartData1.cartData && location.prodId && <button onClick={applyCoupon}>{coupon}</button>}
              </div>
            </div>
            <div className="df rt">
              <h4>total payable</h4>
              <h5>₹ {discount ? totalPay : cartData1.totalPrice}</h5>
            </div>
            <div className="df rt">
              <h4 className="green">your total savings</h4>
              <h5 className="green">₹ {discount}</h5>
            </div>
            <div className="cechkbtn">
              <a href="javascript:void(0)" className="cmn_btn red">
                proceed to checkout
              </a>
            </div>
            <h4 className="eia">EASY INSTALLMENTS AVAILABLE</h4>
          </div>
          <div className="inner_r_order">
            <form action="">
              <div className="df">
                <label htmlFor="f1">this order contains gift?</label>
                <input type="checkbox" id="f1" name="f1" defaultValue="Bike" />
              </div>
            </form>
          </div>
          <div className="inner_r_order">
            <form action="">
              <div className="df">
                <label htmlFor="f1">special comments?</label>
                <input type="checkbox" id="f1" name="f1" defaultValue="Bike" />
              </div>
            </form>
          </div>
          <div className="safe">
            <img src={require("../../assets/images/sheild.png")} alt="sheild" />{" "}
            <p>
              Safe and Secure Payments. Easy returns.100% Authentic products.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  
</>
    </div>
  )
}

export default Cart