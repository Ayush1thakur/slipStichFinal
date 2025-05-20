import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import SignUp from "./pages/Auth/SignUp";
import { ToastContainer } from "react-toastify";
import OTP from "./pages/Auth/OTP";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
// import Cart from "./pages/User/Cart";
import AdminRoute from "./components/Routes/AdminRoute";
// import UserRoute from "./components/Routes/UserRoute";
import Categories from "./pages/Admin/Categories";
import Products from "./pages/Admin/Products";
import CreateEditProduct from "./pages/Admin/CreateEditProduct";
import Service from "./pages/Service";
import CollectionPage from "./pages/CollectionPage";
import CartPage from "./pages/CartPage"; 
import SuccessPage from "./pages/SucessPage";
import CancelPage from "./pages/CancelPage";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* other pages  */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:slug" element={<CollectionPage />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/service" element={<Service />} />

        {/* Authentication */}
        {/* sign up  */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otpVerification/:email" element={<OTP />} />

        {/* login  */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:id" element={<ResetPassword />} />

        {/* user  */}
        {/* <Route path="" element={<UserRoute />}>
          <Route path="/cart" element={<Cart />} />
        </Route> */}

        {/* Admin */}
        <Route path="/admin" element={<AdminRoute />}>

          <Route index element={<Navigate to="categories" replace />} />

          <Route path="categories" element={<Categories />} />

          <Route path="products" element={<Products />} />

          <Route path="products/product/:id" element={<CreateEditProduct />} />

          <Route
            path="products/create-product"
            element={<CreateEditProduct />}
          />

          <Route path="orders" element={<Categories />} />

        </Route>

        <Route path="/*" element={<PageNotFound />} />
        
        <Route path="/cart" element={<CartPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
    </>
  );
}

export default App;
