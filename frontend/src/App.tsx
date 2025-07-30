import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoansPage from "./pages/LoansPage/LoansPage";
import Header from "./components/layout/Header";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useAppDispatch } from "./store/hooks";
import { checkSession } from "./store/auth/actions";

function AppWrapper() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  const location = useLocation();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const hideHeaderRoutes = ["/", "/register"];

  const shouldShowHeader =
    loggedIn && !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegistrationPage />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/loans" element={<LoansPage />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper></AppWrapper>
    </BrowserRouter>
  );
};

export default App;
