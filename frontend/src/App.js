import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Discover from "./pages/Discover/Discover";
import Dashboard from "./pages/Dashboard/Dashboard";
import DocuSignLogin from "./pages/Auth/Auth";
import Redirect from "./pages/Dashboard/Redirect";
import { RegisterDrone } from "./pages/RegisterDrone/RegisterDrone";
import DroneRegistrationSuccess from "./pages/Success/Success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/discover" element={<Discover />} />
        <Route exact path="/callback" element={<Dashboard />} />
        <Route exact path="/auth" element={<DocuSignLogin />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/ds/callback" element={<Redirect />} />
        <Route exact path="/success" element={<DroneRegistrationSuccess />} />
        <Route exact path="/register-drone" element={<RegisterDrone />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
