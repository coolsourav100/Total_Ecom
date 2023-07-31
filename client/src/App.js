
import { BrowserRouter as Router, Route } from "react-router-dom"
import './App.css';
import Home from './pages/HomeSection/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css/navigation';
import 'swiper/css';
import './assets/css/custom.css';
import './assets/css/responsive.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Footer from './components/layout/Footer/Footer';
import Header from './components/Header/Header';
import Product_Details from './components/products/Product_Details';
import Cart from './components/Cart/Cart';
import { useEffect } from "react";
import { setCartData } from "./Store/cartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    fetchDataFromServer()
  }, [])

  const fetchDataFromServer = async () => {
    try {
      const res = await axios.get('http://localhost:4000/cart/get');
      if (res.data.length > 0) {
        dispatch(setCartData(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <Route
          exact path="/" component={Home} />
        <Route path="/productdetails/:id" component={Product_Details} />
        <Route path="/cart" component={Cart} />
        <Footer />
      </Router>


    </div>
  );
}

export default App;
