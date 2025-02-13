import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup.jsx";
import BankerDashboard from "./pages/BankerDashboard";
import UserDashboard from "./pages/UserDashboard.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/banker" element={<BankerDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
