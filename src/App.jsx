import "./App.scss";
import "tw-elements";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryPage from "./pages/typepage/CategoryPage";

function App() {
  return (
    <BrowserRouter basename="/2022-09-Orleans-CDA-Projet-Frontend-EDPK/">
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="category/:genre" element={<CategoryPage />} />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
