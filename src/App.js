import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Cart, Home, Product, ProductPage, UserProfile, Wishlist, Checkout, Error} from "./pages"
import Mockman from "mockman-js";
import Navbar from "./component/Navbar/Navbar"

function App() {
  return (
    <div className="App">
      
      <Navbar />
    </div>
  );
}

export default App;
