import "./App.css";
import Categories from "./Components/Categories";
import Companies from "./Components/Companies";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import Slider from "./Components/Slider";

const App = () => {
  return (
    <>
      <Header />
      {/* <Slider /> */}
      <HeroSection />
      <Categories />
      <br />
      <br />
      {/* <Categories /> */}
      <Companies />
      <br />
      <br />
      <br />
    </>
  );
};

export default App;
