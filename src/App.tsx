import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FilmsPage from "./pages/FilmsPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FilmForm from "./pages/FilmForm";
import Navbar from "./components/Navigation/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <div className="content">
        <BrowserRouter>
          <div className="routes-container">
            <Routes>
              <Route path="/films" element={<FilmsPage />} />
              <Route path="/customfilm" element={<FilmForm />} />
              {/*  <Route path="/customfilm/:filmId" element={<FilmForm />} /> */}
              <Route path="/" element={<Navigate to="/films" replace />} />
            </Routes>
          </div>

          <Navbar />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
