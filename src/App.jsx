import "./App.scss";
import "tw-elements";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Home />
        <Footer />
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
