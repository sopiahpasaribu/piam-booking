import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Komponen utama aplikasi
import { BrowserRouter, createBrowserRouter, Router, RouterProvider } from "react-router-dom"; // Menggunakan Router untuk navigasi
import "./index.css"; // Mengimpor file CSS
import LoginForm from "./pages/LoginForm.jsx";
import SignUpForm from "./pages/SignUpForm.jsx";
import HomePage from "./pages/HomePage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import MyOrdersPage from "./pages/MyOrderPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <SignUpForm />,
  },

  {
    element: <App />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/booking",
        element: <BookingPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path :"/my-orders",
        element : <MyOrdersPage/>
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
