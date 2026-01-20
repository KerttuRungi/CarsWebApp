import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarsView from "./views/CarsView";
import "./App.css";
import CreateUpdateCar from "./components/CreateUpdateCar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CarsView />} />
        <Route path="/create" element={<CreateUpdateCar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
