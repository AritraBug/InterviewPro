import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Candidates from "../pages/Candidates";
import Interviews from "../pages/Interviews";
import Feedbacks from "../pages/Feedbacks";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

        <Route
          path="/candidates"
          element={<ProtectedRoute>
      <Candidates />
    </ProtectedRoute>}
        />

        <Route
          path="/interviews"
          element={<ProtectedRoute>
      <Interviews />
    </ProtectedRoute>}
        />

        <Route
          path="/feedbacks"
          element={<ProtectedRoute>
      <Feedbacks />
    </ProtectedRoute>}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;