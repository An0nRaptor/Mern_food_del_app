import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import "./index.css";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";
import Login from "./Components/Login/Login";
import Verify from "./Pages/Verify/Verify";
import MyOrders from "./Pages/MyOrders/MyOrders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/order" exact element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
