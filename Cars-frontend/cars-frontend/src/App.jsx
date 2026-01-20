import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarsView from "./views/CarsView";
import "./App.css";
import CreateUpdateCar from "./components/CreateUpdateCar";
import CarDetailsView from "./views/CarDetailsView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CarsView />} />
        <Route path="/create" element={<CreateUpdateCar />} />
        <Route path="/update/:id" element={<CreateUpdateCar />} />
        <Route path="/details/:id" element={<CarDetailsView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
