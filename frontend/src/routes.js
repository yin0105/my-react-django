import LoginPage from "./containers/Login";
import RegisterPage from "./containers/Login/Register";
import EditProfile from "./containers/profile";
import Company from "./containers/SendEmail";

const routes = [
  {
    path: "/login",
    access: "auth",
    name: "Login Page",
    icon: "pe-7s-info",
    component: LoginPage
  },
  {
    path: "/register",
    access: "auth",
    name: "Register Page",
    icon: "pe-7s-info",
    component: RegisterPage
  },
  {
    path: "/admin/my_profile",
    access: "common",
    name: "My PROFILE",
    show: "false",
    icon: "pe-7s-info",
    component: EditProfile
  },
  {
    path: "/admin/account",
    access: "common",
    name: "Company",
    show: "true",
    icon: "pe-7s-mail",
    component: Company
  },
];
export default routes;
