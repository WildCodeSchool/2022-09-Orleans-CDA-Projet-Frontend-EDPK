import "./App.scss";
import "tw-elements";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Movie from "./pages/detail/movie";

function App() {
  return (
    <>
      <Navbar />
      <Movie />
      <Footer />
    </>
  );
}

export default App;
