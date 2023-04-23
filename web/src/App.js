import Navbar from "./components/Navbar";
import DashboardPage from "./components/DashboardPage";
import CreateCampaignPage from "./components/CreateCampaignPage";
import FormPage from "./components/FormPage";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div className="m-12">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/create-campaign" element={<CreateCampaignPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
