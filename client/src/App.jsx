import React from "react";
import { Landing, Men, Women, Collection, Sales, About, Carts, Login, Signup, Favourites } from "./pages/pagesLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="flex items-center justify-center">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/men-collection" element={<Men />} />
          <Route path="/women-collection" element={<Women />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
