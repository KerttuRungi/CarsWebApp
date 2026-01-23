import { Routes, Route } from "react-router-dom";
import CarsView from "./views/CarsView";
import HomeView from "./views/HomeView";
import "./App.css";
import CreateUpdateCar from "./components/CreateUpdateCar";
import CarDetailsView from "./views/CarDetailsView";

function App() {
  return (
      <Routes>
        <Route path="/cars" element={<CarsView />} />
        <Route path="/" element={<HomeView />} />
        <Route path="/create" element={<CreateUpdateCar />} />
        <Route path="/update/:id" element={<CreateUpdateCar />} />
        <Route path="/details/:id" element={<CarDetailsView />} />
      </Routes>
  );
}

export default App;
