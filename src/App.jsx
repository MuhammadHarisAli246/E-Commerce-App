import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard.jsx";
import CourseDetail from "./pages/ProductDetail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Private route component
  const PrivateRoute = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/register"
          element={<Register users={users} setUsers={setUsers} />}
        />

        <Route
          path="/login"
          element={<Login users={users} setCurrentUser={setCurrentUser} />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
  path="/dashboard/product/:id"
  element={
    <PrivateRoute>
      <ProductDetail />
    </PrivateRoute>
  }
/>

      </Routes>
    </>
  );
}

export default App;
