import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import ListUsers from "../pages/user/ListUsers";
import NewUser from "../pages/user/NewUser";
import ListDoctors from "../pages/doctor/ListDoctors";
import NewDoctor from "../pages/doctor/NewDoctor";
import ListSpecialtys from "../pages/specialty/ListSpecialtys";
import NewSpecialty from "../pages/specialty/NewSpecialty";
import ListClinics from "../pages/clinic/ListClinics";
import NewClinic from "../pages/clinic/NewClinic";
import ListSchedules from "../pages/schedule/ListSchedules";
import NewSchedule from "../pages/schedule/NewSchedule";
import ListBookings from "../pages/booking/ListBookings";
import NewBooking from "../pages/booking/NewBooking";

//public Routes
const publicRoutes = [
  { path: "/login", component: Login, layout: DefaultLayout },
];

//admin Routes
const privateRoutes = [
  {
    path: "/",
    component: Home,
    layout: DefaultLayout,
  },
  {
    path: "/doctors",
    component: ListDoctors,
    layout: DefaultLayout,
  },
  {
    path: "/doctors/new",
    component: NewDoctor,
    layout: DefaultLayout,
  },

  {
    path: "/schedules",
    component: ListSchedules,
    layout: DefaultLayout,
  },

  {
    path: "/schedules/new",
    component: NewSchedule,
    layout: DefaultLayout,
  },
  {
    path: "/bookings",
    component: ListBookings,
    layout: DefaultLayout,
  },
  {
    path: "/bookings/new",
    component: NewBooking,
    layout: DefaultLayout,
  },
];
const adminRoutes = [
  {
    path: "/users",
    component: ListUsers,
    layout: DefaultLayout,
  },
  {
    path: "/users/new",
    component: NewUser,
    layout: DefaultLayout,
  },
  {
    path: "/clinics",
    component: ListClinics,
    layout: DefaultLayout,
  },

  {
    path: "/clinics/new",
    component: NewClinic,
    layout: DefaultLayout,
  },
  {
    path: "/specialtys",
    component: ListSpecialtys,
    layout: DefaultLayout,
  },
  {
    path: "/specialtys/new",
    component: NewSpecialty,
    layout: DefaultLayout,
  },
];

const IsLogin = () => {
  const { current } = useSelector((state) => state.auth);
  return current?.role === 1 || current?.role === 2 ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

const IsAdmin = () => {
  const { current } = useSelector((state) => state.auth);
  return current?.role === 1 ? <Outlet /> : <Navigate to="*" />;
};

export { publicRoutes, adminRoutes, privateRoutes, IsAdmin, IsLogin };
