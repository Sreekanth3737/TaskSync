import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/organisms/Layout/Layout";
import TaskBoardPage from "./pages/TaskBoardPage/TaskBoardPage";
import Calendar from "./pages/Calendar/Calendar";
import Reports from "./pages/Reports/Reports";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TaskBoardPage />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
