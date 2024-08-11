import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import MatchPage from "./pages/MatchPage";
import EditPage from "./pages/EditPage";
import RankingPage from "./pages/RankingPage";
import SettingPage from "./pages/SettingPage";
import Layout from "./components/Layout";
import FindPinPage from "./pages/FindPinPage";
import WelcomePage from "./pages/WelcomePage";
import "toastr/build/toastr.min.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/login" element={<MainPage />} />
                <Route path="/match" element={<MatchPage />} />
                <Route path="/edit" element={<EditPage />} />
                <Route path="/ranking" element={<RankingPage />} />
                <Route path="/setting" element={<SettingPage />} />
                <Route path="/findPin" element={<FindPinPage />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
