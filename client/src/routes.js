import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Clients from "views/examples/Clients.js";
import BuyAssessments from "views/examples/buyAssessments";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "fas fa-th-large text-light",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/editprofile",
    name: "Profile",
    icon: "far fa-user text-light",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/clients",
    name: "Security",

    icon: "fas fa-shield-alt text-light",
    component: Clients,
    layout: "/admin",
  },
  {
    path: "/buyassessments",
    name: "Payment",
    icon: "far fa-credit-card text-light",
    component: BuyAssessments,
    layout: "/admin",
  },
];
export default routes;
