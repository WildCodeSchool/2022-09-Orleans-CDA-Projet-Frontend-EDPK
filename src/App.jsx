import "./App.scss";
import "tw-elements";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Quiz from "./pages/quiz/Quiz";
import CategoryPage from "./pages/typepage/CategoryPage";
import Movie from "./pages/detail/Movie";
import Tv from "./pages/detail/Tv";
import Person from "./pages/detail/Person";
import Error404 from "./pages/error404/Error404";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <BrowserRouter basename="/2022-09-Orleans-CDA-Projet-Frontend-EDPK/">
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/category/:type/:genre/:pageNumber"
            element={<CategoryPage />}
          />
          <Route path="/movie/:movieId" element={<Movie />} />
          <Route path="/tv/:tvId" element={<Tv />} />
          <Route path="/person/:personId" element={<Person />} />
          <Route path="/quiz/" element={<Quiz />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
