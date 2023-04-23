import Navbar from "./components/Navbar";
import DashboardPage from "./components/DashboardPage";
import CreateCampaignPage from "./components/CreateCampaignPage";
import FormPage from "./components/FormPage";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar mobile={true} signedIn={true} userHidden={false} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-campaign" element={<CreateCampaignPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
