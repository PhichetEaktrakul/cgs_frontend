import { Route, Routes } from "react-router";
import Menu from "./pages/CustomerMenu";
import Consignment from "./components/customer/Consignment";
import Interest from "./components/customer/Interest";
import Redeem from "./components/customer/Redeem";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import BoardcastPrice from "./pages/BoardcastPrice";
import InitialPage from "./pages/InitialPage";
import ProtectedLayout from "./components/ProtectedLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InitialPage />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/consignment" element={<Consignment />} />
      <Route path="/interest" element={<Interest />} />
      <Route path="/redeem" element={<Redeem />} />
      <Route path="/admin/auth" element={<AdminLogin />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      <Route path="/boardcast" element={<BoardcastPrice />} />
    </Routes>
  );
};

export default AppRoutes;
