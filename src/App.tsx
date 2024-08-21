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
import PrivacyPolicy from "./util/PrivacyPolicy";
import TermsAndConditions from "./util/TermsAndConditions";
import GuidePage from "./pages/GuidePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />{" "}
        <Route path="/termsAndConditions" element={<TermsAndConditions />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/guide" element={<GuidePage />} />
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
