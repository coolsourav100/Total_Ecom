import React, { useEffect, useState } from 'react';
import pic from '../../assets/images/logo.png';
import Search from './Search';

import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Header = () => {
    const cartData = useSelector((state) => state.cart);
  const counter = useSelector((state) => state.counter.value);
  const [cartitem, setCartItem] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/cart/get');
        const cartDataLength = response.data[0].cartData.length;
        setCartItem(cartDataLength);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchData();
  }, [counter,cartData]);

    return (
        <header>

            <div
                className="hdr_mn_otr"
                data-aos="zoom-out"
                data-aos-easing="linear"
                data-aos-duration={1000}
            >
                <div className="container">
                    <div className="logo">
                        <Link to='/'>
                            <img src={require('../../assets/images/logo.png')} alt="" />
                        </Link>
                    </div>
                    <div className="hdr_otr">
                       {/**  <div className="crncy_optn">
                            <div className="dropdown">
                                <button
                                    className="dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Choose Currency
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="javascript:void(0);">
                                            <p>
                                                <span>India</span>
                                            </p>
                                            <div className="crncy">
                                                <i className="fa-solid fa-indian-rupee-sign" />
                                            </div>
                                            <p />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="javascript:void(0);">
                                            <p>
                                                <span>USA</span>
                                            </p>
                                            <div className="crncy">
                                                <i className="fa-solid fa-dollar-sign" />
                                            </div>
                                            <p />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>*/}

                        {/* Search section */}
                        <Search />
                        <div className="crt_itm">
                            <a
                                data-aos="fade-up"
                                data-aos-duration={2000}
                                href="javascript:void(0);"
                            >

                                <img src={require('../../assets/images/cart-1.png')} alt="" />
                            </a>
                            <a
                                data-aos="fade-down"
                                data-aos-duration={2000}
                                href="javascript:void(0);"
                            >
                                <img src={require('../../assets/images/cart-2.png')} alt="" />
                            </a>
                            <Link to='/cart'
                                data-aos="fade-up"
                                data-aos-duration={2000}
                                className='cart-badge'
                            >
                                <img src={require('../../assets/images/cart-3.png')} alt="" />
                                <p className='bagde'>{cartitem}</p>
                                {/* <a href="#" className="badge badge-danger">Danger</a> */}
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </div>

            


        </header>
    )
}

export default Header
