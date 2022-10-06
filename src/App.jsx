import "./App.css";
import "tw-elements";
import Home from "./pages/home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}

export default App;
