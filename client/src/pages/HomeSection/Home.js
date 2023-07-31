import React, { useEffect, useState } from 'react'
import { Autoplay, FreeMode, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
import Loader from '../../components/layout/Loader/Loader'
import axios from 'axios';



const Home = () => {

  const [loading, setLoading] = useState(false)
  const [productData, setProductData] = useState([])
  const [sliderData, setSliderData] = useState([])

  useEffect(() => {
    (async () => {
      try {

        let res = await axios.get('http://localhost:4000/product/allProduct')
        if (res) {

          setProductData(res.data)
        } else {
          console.log('Responce not recived')
        }
        let reSlider = await axios.get('http://localhost:4000/silder/allSlider')
        if (reSlider) {
          setLoading(false)
          setSliderData(reSlider.data)
        } else {
          console.log('Responce not recived')
        }

      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  return (
    <>
      {
        loading ? <Loader /> : (
          <>
            {/* Home HeroSection Banner*/}

            <section className="bnr_sec">
              <div className="container">

                <Swiper className='bannerSwiper'
                  modules={[Navigation, Autoplay, FreeMode]}
                  mousewheel={true}
                  // direction= 'vertical'
                  spaceBetween={0}
                  slidesPerView={1}
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
                  }}

                >


                  {sliderData.map((item) => (
                    <SwiperSlide>
                      <div className="img_otr" data-aos="zoom-in" data-aos-duration={2000}>
                        <Link to={{
                          pathname: '/cart', state: item.coupon, prodId: item.
                            productId, dis: item.dis
                        }}><img src={item.image} alt={item.name} /></Link>
                      </div>
                    </SwiperSlide>

                  ))

                  }
                </Swiper>
              </div>
            </section>

            <div className="right_article">
              <div className="right_top_box">
                <button className="artcl_top_box cmn_btn">
                  <img src={require("../../assets/images/best_topbox1.png")} alt="img" />
                  <span>New</span>
                </button>
                <button className="artcl_top_box cmn_btn">
                  <img src={require("../../assets/images/best_topbox2.png")} alt="img" />
                  <span>ready to ship</span>
                </button>
                <button className="artcl_top_box cmn_btn">
                  <img src={require("../../assets/images/best_topbox3.png")} alt="img" />
                  <span>on sale</span>
                </button>
                <button className="artcl_top_box cmn_btn">
                  <img src={require("../../assets/images/best_topbox4.png")} alt="img" />
                  <span>customizable</span>
                </button>
              </div>
              <div className="right_prdct_box" >
                {
                  productData && productData.map((data, ind) => {
                    return (<Link to={`/productdetails/${data._id}`}> <div className="prdcts_info">
                      <div className="prdct_img">
                        <a href="javascript:void(0);" className="prdct_point">
                          <img src={data.img} alt="img" />
                          <div className="prdct_overlay prdct_info_overlay">
                            <div className="prdct_text">
                              <div className="prchs_dtls">

                              </div>
                            </div>
                          </div>
                        </a>

                      </div>
                      <div className="prdct_cntnt">
                                                        // <a href="javascript:void(0);">{data.name}</a>
                        <div className="prc_dtls">
                          <p>
                            <span> {data.mrp}</span>{data.price}
                          </p>

                        </div>
                      </div>
                    </div> </Link>)
                  }
                  )
                }
              </div>
              <div className="ltst_pgntn">
                <nav aria-label="...">
                  <ul className="pagination">
                    <li className="page-item">
                      <a
                        className="page-link"
                        href="javascript:void(0);"
                        tabIndex={-1}
                        aria-disabled="true"
                      >
                        Page 1 of 2
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="javascript:void(0);">
                        1
                      </a>
                    </li>
                    <li className="page-item" aria-current="page">
                      <a className="page-link" href="javascript:void(0);">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="javascript:void(0);">
                        Next &gt;
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>


          </>
        )
      }
    </>
  )
}

export default Home
