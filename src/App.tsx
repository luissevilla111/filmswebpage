import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FilmsPage from "./pages/FilmsPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FilmForm from "./pages/FilmForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/addfilm" element={<FilmForm />} />
          <Route
        path="/"
        element={<Navigate to="/films" replace />}
    />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
