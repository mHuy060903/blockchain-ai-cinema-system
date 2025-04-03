import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "leaflet/dist/leaflet.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import LayoutDashboard from "./components/Dashboard/LayoutDashboard.jsx";
import Movies from "./pages/Dashboard/Movies.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Profile from "./pages/Profile.jsx";
import Genre from "./pages/Dashboard/Genre.jsx";
import Cinema from "./pages/Dashboard/Cinema.jsx";
import Screens from "./pages/Dashboard/Screens.jsx";
import Showtimes from "./pages/Dashboard/Showtimes.jsx";
import SeatTypes from "./pages/Dashboard/SeatTypes.jsx";
import Setting from "./pages/Dashboard/Setting.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Booking from "./pages/Booking.jsx";
import Payment from "./pages/Payment.jsx";
import TicketDetail from "./pages/TicketDetail.jsx";
import Tickets from "./pages/Tickets.jsx";
import Scan from "./pages/Dashboard/Scan.jsx";
import Bookings from "./pages/Dashboard/Bookings.jsx";
import DashboardChat from "./pages/Dashboard/DashboardChat.jsx";
import Favorite from "./pages/Favorite.jsx";
import AIAssitant from "./pages/AIAssistant.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" index element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ticket" element={<Tickets />} />
        <Route path="/category/movie/:id" element={<MovieDetail />} />
        <Route path="favorites" element={<Favorite />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/assistant" element={<AIAssitant />} />
        <Route path="/ticket/:id" element={<TicketDetail />} />
      </Route>
      <Route path="/dashboard" element={<LayoutDashboard />}>
        <Route index element={<Dashboard />} />
        <Route path="movies" element={<Movies />} />
        <Route path="booking" element={<Bookings />} />
        <Route path="Genre" element={<Genre />} />
        <Route path="cinemas" element={<Cinema />} />
        <Route path="screens" element={<Screens />} />
        <Route path="showtimes" element={<Showtimes />} />
        <Route path="seattypes" element={<SeatTypes />} />
        <Route path="settings" element={<Setting />} />
        <Route path="scan" element={<Scan />} />
        <Route path="message" element={<DashboardChat />} />
      </Route>
    </>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer />
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
