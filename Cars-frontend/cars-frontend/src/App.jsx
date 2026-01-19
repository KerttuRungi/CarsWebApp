import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarsView from "./views/CarsView";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CarsView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
