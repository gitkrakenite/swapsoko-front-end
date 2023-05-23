import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./screens/Home";
import Create from "./screens/Create";
import MyProfile from "./screens/MyProfile";
import Favorites from "./screens/Favorites";
import "bootstrap/dist/css/bootstrap.min.css";
import SpecificPost from "./screens/SpecificPost";
import UserProfile from "./screens/UserProfile";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { useState } from "react";
import Advanced from "./screens/Advanced";

function App() {
  const [cartItemCount, setCartItemCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="bg-slate-900 text-zinc-300 min-h-[100vh]">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartItemCount={cartItemCount}
                setCartItemCount={setCartItemCount}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/fav"
            element={
              <Favorites
                cartItemCount={cartItemCount}
                setCartItemCount={setCartItemCount}
              />
            }
          />
          <Route path="/create" element={<Create />} />
          <Route path="/post/:postId" element={<SpecificPost />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/advanced" element={<Advanced />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </section>
  );
}

export default App;
