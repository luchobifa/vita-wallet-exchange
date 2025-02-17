import { Navigate, Route, Routes } from "react-router";
import "./styles/App.css";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ExchangePage } from "./pages/ExchangePage";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { PublicRoute } from "./utils/PublicRoute";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exchange"
            element={
              <ProtectedRoute>
                <ExchangePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
