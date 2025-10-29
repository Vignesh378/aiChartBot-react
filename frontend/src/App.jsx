import{ BrowserRouter as Router,
  Routes,
  Route,
  Navigate
 }  from"react-router-dom"
import {Toaster} from "react-hot-toast";
import LandingPage from "./pages/Landing.jsx/LandingPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProtectedRoute from "./component/auth/ProtectedRoutes";
import Generator from "./pages/generator/Generator";
import { AuthProvider} from "./context/AuthContext";
import Profile from "./pages/profile/Profile.jsx";

function App() {
  return (
  <AuthProvider>
    <Router>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>

        {/* protected */}
        <Route path="/" element={<ProtectedRoute/>}>
        <Route path="generate" element={<Generator/>}/>
        <Route path="profile" element={<Profile/>}/>
         </Route>

        {/* catch all routes */}
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </Router>
      <Toaster
    toastOptions={{
      className: '',
      style:{
        fontSize:"13px",
      },
    }}/>
</AuthProvider>
  )
}

export default App;
