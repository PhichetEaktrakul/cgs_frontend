import AppRoutes from "./routes";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster />
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
