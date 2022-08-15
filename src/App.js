import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Cart, Home, Product, ProductPage, UserProfile, Wishlist, Checkout, Error} from "./pages"
import Mockman from "mockman-js";
import Navbar from "./component/Navbar/Navbar"
import {Login, Signup} from "./pages/Auth"

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <Navbar />
    </div>
  );
}

export default App;
