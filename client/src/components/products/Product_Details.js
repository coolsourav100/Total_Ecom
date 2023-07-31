import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import img from '../../assets/images/nletter_img1.png'
import { Autoplay, FreeMode, Navigation } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { addToCart } from '../../Store/cartSlice';
import axios from 'axios';
import useCartData from '../../CustomHook/useCartData';
import { setCartData } from '../../Store/cartSlice';
import { increment } from '../../Store/toggleSlice';

const Product_Details = () => {
	const { cartData, totalItems, totalPrice, sendDataToServer } = useCartData();
	// console.log(cartData,'pppppppppppppppppppp')
	const [item, setItem] = useState()
	const [toggle, setToggle] = useState(false)
	const params = useParams()
	const dispatch = useDispatch()
	const prodId = params.id

	useEffect(() => {
		(async () => {
			try {
				let res = await axios.get(`http://localhost:4000/product/products/${prodId}`)
				if (res) {
					setItem(res.data)
				}
			} catch (err) {
				console.log(err)
			}
		})()
	}, []);
	useEffect(() => {
		fetchDataFromServer();

	}, [toggle])

	// Function to fetch data from the server and set it in the Redux state
	const fetchDataFromServer = async () => {
		try {
			const res = await axios.get('http://localhost:4000/cart/get');
			if (res.data.length > 0) {
				console.log(res.data, '-------------------------')
				dispatch(setCartData(res.data));
			}
		} catch (error) {
			console.log(error);
		}
	};


	const addToCartData = (e) => {
		const existingCartItem = cartData.find((cartItem) => cartItem._id === item._id);
		if (existingCartItem) {
			existingCartItem.quantity += 1;
			const updatedCartData = cartData.map((cartItem) =>
				cartItem.id === existingCartItem.id ? existingCartItem : cartItem
			);

			dispatch(setCartData(updatedCartData));
			sendDataToServer({
				cartData: updatedCartData,
				totalItems: totalItems + 1,
				totalPrice: totalPrice + Number(item.price),
			});
		} else {
			item.quantity = 1;
			const updatedCartData = [...cartData, item];

			dispatch(setCartData(updatedCartData));
			sendDataToServer({
				cartData: updatedCartData,
				totalItems: totalItems + 1,
				totalPrice: totalPrice + Number(item.price),
			});
		}
		dispatch(increment())
		setToggle(!toggle)
	};
	return (
		<>
			<section className="prdct_dtls_sec cmn_pdding">
				<div className="container">
					<div className="prdct_sldr">
						<div className="gallery-container">
							<div className="swiper-container gallery-main">

								<div className="swiper-wrapper">
									<div className="swiper-slide">
										<div className="img_otr">
											<img src={item?.img} alt="Product Image" />
										</div>

									</div>

								</div>

							</div>

						</div>
						<div className="prdct_dtls_otr">
							<div className="cmn_hdr">
								<h3>{item?.name}</h3>
								<h4> <span>₹ {item?.mrp}</span>{item?.price}</h4>
							</div>
							<div className="prdct_cd">
								<div className="prdct_inr">
									<p>Product Code: {item?._id}</p>
								</div>
								<div className="prdct_inr">
									<p>Availability: In Stock</p>
								</div>
							</div>
							<div className="sz_otr">
								<h3>Product Description</h3>
								<div className="sz_inr">
									<p className='bx'>{item?.product_details}</p>
								</div>

							</div>
							<div className="ad-to-bg">
								{/* <button className="ad_bg" onClick={addToCartData}>
									<span><img src={require("../../assets/images/add_bag.png")} alt="bag-ico" /></span>
									ADD TO BAG
								</button> */}
								<button className="wshlst cmn_btn" onClick={addToCartData}>

									ADD TO BAG
								</button>

							</div>
							{/* <div className="ofr_otr">
								<p>OFFERS FOR YOU</p>
								<div className="ofr_inr">
									<div className="cpn_sc">
										<p>Coupon : WELCOME10</p>
									</div>
									<div className="crgts">
										<p style={{ color: '#555555' }}>Congratulations! You are eligible for 10% discount.</p>
										<p style={{ color: '#949494' }}>T&amp;C Apply*</p>
									</div>
								</div>
							</div> */}
							<div className="vw">
								<p><span><img src={require("../../assets/images/view-eye.png")} alt="view" /></span>
									161 people are viewing this item. Don't wait!
								</p>
							</div>
							<div className="prchs_prtctn_sec">
								<div className="prchs_inr">
									<p><span><img src={require("../../assets/images/purchase_1.png")} alt="" /></span>
										100% Purchase Protection
									</p>
								</div>
								<div className="prchs_inr">
									<p><span><img src={require("../../assets/images/purchase_2.png")} alt="" /></span>
										48 Hours easy returns.
									</p>
								</div>
								<div className="prchs_inr">
									<p><span><img src={require("../../assets/images/purchase_3.png")} alt="" /></span>
										Assures Quality
									</p>
								</div>
								<div className="prchs_inr">
									<p><span><img src={require("../../assets/images/purchase_4.png")} alt="" /></span>
										Free Shipping*
									</p>
								</div>
							</div>
							<div className="accrdn_sec">
								<div className="accordion">
									<div className="accrdn_Hdng">
										<h2>Product Details</h2>
										<i />
									</div>
									<div className="accrdn_Cntnt">
										<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam reprehenderit quos, ut
											vel aliquid soluta quibusdam ad! Ipsa soluta praesentium et excepturi, vitae in,
											molestias illum velit ut possimus veniam?</p>
									</div>
								</div>
								<div className="accordion">
									<div className="accrdn_Hdng">
										<h2>Style &amp; Fit Tips</h2>
										<i />
									</div>
									<div className="accrdn_Cntnt">
										<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam reprehenderit quos, ut
											vel aliquid soluta quibusdam ad! Ipsa soluta praesentium et excepturi, vitae in,
											molestias illum velit ut possimus veniam?</p>
									</div>
								</div>
								<div className="accordion">
									<div className="accrdn_Hdng">
										<h2>Shipping &amp; Returns</h2>
										<i />
									</div>
									<div className="accrdn_Cntnt">
										<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam reprehenderit quos, ut
											vel aliquid soluta quibusdam ad! Ipsa soluta praesentium et excepturi, vitae in,
											molestias illum velit ut possimus veniam?</p>
									</div>
								</div>
								<div className="accordion">
									<div className="accrdn_Hdng">
										<h2>FAQs</h2>
										<i />
									</div>
									<div className="accrdn_Cntnt">
										<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam reprehenderit quos, ut
											vel aliquid soluta quibusdam ad! Ipsa soluta praesentium et excepturi, vitae in,
											molestias illum velit ut possimus veniam?</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* *** Product Details Sec End */}
			{/*** Descript-Specification section ***/}
			<section className="dscrptn-spcfctn">
				<div className="container">
					<div className="dscrp_otr">
						<div className="dscrp_inr">
							<p style={{ backgroundColor: '#e5e5e5' }}>DESCRIPTION</p>
							<p>Category</p>
							<p>Name</p>
							<p>Price</p>
							<p>product Code</p>
							<p>NetWeight</p>
							<p>GrossWeight</p>
						</div>
						<div className="dscrp_inr">
							<p style={{ backgroundColor: '#e5e5e5' }}>SPECIFICATION</p>
							<p>{item?.category}</p>
							<p>{item?.name}</p>
							<p>{item?.mrp}</p>
							<p>{item?._id}</p>
							<p>{item?.netWeight}</p>
							<p>{item?.grossWeight}</p>

						</div>
					</div>
				</div>
			</section>
			{/*** Descript-Specification section End ***/}
			{/*** Related product Sec */}
			{/*<section className="rltd_sec cmn_pdding">
	
	  <div className="container">
		<div className="ssnl_sld_otr rltd_sld_otr">
		  <div className="cmn_hdr">
			<h3>Related product</h3>
		  </div>
		  <div className="">
			<Swiper className='bannerSwiper'
                  modules={[Navigation, Autoplay, FreeMode]}
                  mousewheel={true}
                  // direction= 'vertical'
                  spaceBetween={0}
                  slidesPerView={3}
                  navigation={{
                    prevEl: '.prev',
                    nextEl: '.next',
                  }}

                  speed={3100}
                  autoHeight={false}
                  calculateHeight={true}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                  }}>

			<SwiperSlide>
                      <div className="img_otr" data-aos="zoom-in" data-aos-duration={2000}>
                        <img src={require("../../assets/images/seasonal-slide-3.jpg")} alt='img3' />
                      </div>
                    </SwiperSlide>
			<SwiperSlide>
                      <div className="img_otr" data-aos="zoom-in" data-aos-duration={2000}>
                        <img src={require("../../assets/images/seasonal-slide-2.jpg")} alt='img2' />
                      </div>
                    </SwiperSlide>
			<SwiperSlide>
                      <div className="img_otr" data-aos="zoom-in" data-aos-duration={2000}>
                        <img src={require("../../assets/images/seasonal-slide-1.jpg")} alt='img1' />
                      </div>
                    </SwiperSlide>
			</Swiper>
			
		  </div>
		  <div className="ssnl_swpr_arrws">
			<div className="ssnl-arrow-next">
			  <img src={require("../../assets/images/seasonal_arrow_rght.png")} alt="" />
			</div>
			<div className="ssnl-arrow-prev">
			  <img src={require("../../assets/images/seasonal_arrow_left.png")} alt="" />
			</div>
		  </div>
		</div>
	  </div>
								</section>*/}
			{/*** Related product Sec End*/}

			{/* *** Feature Start ****/}

			{/* *** Feature Start End****/}

		</>
	)
}

export default Product_Details