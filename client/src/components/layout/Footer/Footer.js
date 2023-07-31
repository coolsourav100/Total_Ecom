import React from 'react'


const Footer = () => {
  
  return (
    <>
      
      <footer className="cmn_footr" data-aos="zoom-in" data-aos-duration={2000}>
        <div className="container">
          <div className="parent_footer">
            <div className="footer_box">
              <a href="javascript:void(0)" className="footer_logo">
                <img src={require('../../../assets/images/footer_logo.png')} alt="Footer_logo" />
              </a>
            </div>
            <div className="footer_box">
              <div className="cmn_hdr">
                <h4>Quick Links</h4>
                <ul>
                  <li>
                    <a href="javascript:void(0)">About Us</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Contact Us</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">FAQ</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Shipping Policy & Delivery Timeline</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Terms & Condition</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Blog</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer_box">
              <div className="cmn_hdr">
                <h4>INFORMATION</h4>
                <ul>
                  <li>
                    <a href="javascript:void(0)">About Us</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Shipping &amp; Return Policy</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Bottoms</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Terms &amp; Conditions</a>
                  </li>
                  
                </ul>
              </div>
            </div>
            <div className="footer_box">
              <div className="cmn_hdr">
                <h4>Popular Categories</h4>
                <ul>
                  <li>
                    <a href="javascript:void(0)">Chicken</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Ready To Cook
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Marinated</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Kebabs</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Parathas</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer_box">
              <div className="cmn_hdr">
                <h4>CONTACT US</h4>
                <ul>
                  <li className="address">
                  9 A. J. C Bose Road<br/>
                  Ideal Centre, 5th Floor,<br/>
                  Kolkata - 700017
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <span>
                        <img src={require('../../../assets/images/footer_phone.png')} alt="footer phone" />
                      </span>
                      +91-18002122102
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <span>
                        <img src={require('../../../assets/images/footer_mail.png')} alt="footer mail" />
                      </span>
                      info@totalfoods.in
                    </a>
                  </li>
                  
                  <li className='d-flex'>
                    <a href="javascript:void(0)" className='me-2'>
                      <span>
                        <img src={require('../../../assets/images/footer_fb.png')} alt="footer fb" />
                      </span>
                    </a>
                    <a href="javascript:void(0)" className='me-2'>
                      <span>
                        <img src={require('../../../assets/images/footer_insta.png')} alt="footer insta" />
                      </span>
                    </a>
                    follow us

                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="btm">
          <div className="ftr-bttm">
            <div className="ftr-btn-flx wow fadeInLeft" data-wow-delay="0.3s">
              <div className="ftr-btm-details">
                <p>
                  <span>©</span> 2023
                  All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer
