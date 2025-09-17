import AppRoutes from "./routes";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { CustomerProvider } from "./context/CustomerContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CustomerProvider>
          <AppRoutes />
          <Toaster />
        </CustomerProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
