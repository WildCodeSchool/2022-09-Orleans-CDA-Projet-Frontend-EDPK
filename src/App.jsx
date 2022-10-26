import "./App.scss";
import "tw-elements";
import Home from "./pages/home/Home";
import Quiz from "./pages/quiz/Quiz";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryPage from "./pages/typepage/CategoryPage";
import Movie from "./pages/detail/Movie";
import Tv from "./pages/detail/Tv";

function App() {
  return (
    <BrowserRouter basename="/2022-09-Orleans-CDA-Projet-Frontend-EDPK/">
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:genre" element={<CategoryPage />} />
          <Route path="/movie/:movieId" element={<Movie />} />
          <Route path="/tv/:tvId" element={<Tv />} />
          <Route path="/quiz/" element={<Quiz />} />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
