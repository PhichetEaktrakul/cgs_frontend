import { Route, Routes } from "react-router";
import InitialPage from "./pages/common/InitialPage";
import Menu from "./pages/customer/CustomerMenu";
import Consignment from "./pages/customer/Consignment";
import Interest from "./pages/customer/Interest";
import Redeem from "./pages/customer/Redeem";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BoardcastPrice from "./pages/BoardcastPrice";
import ProtectedLayout from "./components/common/ProtectedLayout";

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
        <Route path="/admin/dashboard/" element={<AdminDashboard />} />
      </Route>
      <Route path="/boardcast" element={<BoardcastPrice />} />
    </Routes>
  );
};

export default AppRoutes;
