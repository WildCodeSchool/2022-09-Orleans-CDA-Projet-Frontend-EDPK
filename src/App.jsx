import "./App.scss";
import "tw-elements";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movie from "./pages/detail/movie";

function App() {
  return (
    <BrowserRouter basename="/2022-09-Orleans-CDA-Projet-Frontend-EDPK/">
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<Movie />} />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
