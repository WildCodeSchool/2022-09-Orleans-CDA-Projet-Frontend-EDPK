import "./App.scss";
import "tw-elements";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TypePage from "./pages/typepage/TypePage";

function App() {
  return (
    <BrowserRouter basename="/2022-09-Orleans-CDA-Projet-Frontend-EDPK/">
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="category/:genre" element={<TypePage />} />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
