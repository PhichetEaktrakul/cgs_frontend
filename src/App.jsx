import AppRoutes from "./routes";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <AppRoutes />
          <Toaster />
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
