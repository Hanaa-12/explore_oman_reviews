import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Comp/Home";
import About from "./Comp/About";
import Contact from "./Comp/Contact";
import Privacy from "./Comp/Privacy";
import Restaurants from "./Comp/Restaurants";
import Hotels from "./Comp/Hotels";
import Mosques from "./Comp/Mosques";
import Attractions from "./Comp/Attractions";
import Login from "./client_register/Login";
import Signup from "./client_register/Signup";
import Developers from "./Comp/Developers";
import RestaurantDetails from "./Comp/RestaurantDetails";
import AddRestReview from "./Comp/AddRestReview";
import AttractionDetails from "./Comp/AttractionDetails"
import AddAttraReview from "./Comp/AddAttraReview"
import MosqueDetails from "./Comp/MosqueDetails";
import AddMosqueReview from "./Comp/AddMosqueReview";
import AddHotelReview from "./Comp/AddHoteReview";
import HotelsDetails from "./Comp/HotelsDetails";
import AdminDashboard from "./Comp/AdminDashboard";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/mosques" element={<Mosques />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/Developers" element={<Developers />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/restaurant/:id/review" element={<AddRestReview />} />
        <Route path="/attractions/:id" element={<AttractionDetails />} />
        <Route path="/attractions/:id/review" element={<AddAttraReview />} />
        <Route path="/mosque/:id" element={<MosqueDetails />} />
        <Route path="/mosque/:id/review" element={<AddMosqueReview />} />
        <Route path="/hotels/:id/review" element={<AddHotelReview />} />
        <Route path="/hotels/:id" element={<HotelsDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
        

      </Routes>
    </Router>
  );
}