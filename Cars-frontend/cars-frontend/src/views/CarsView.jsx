import React from "react";
import { getAllCars } from "../api/carsCRUDApi.js";

export default function CarsView() {
    const [cars, setCars] = React.useState([]);
    React.useEffect(() => {
        fetchCars();
    }, []);
    const fetchCars = async () => {
        try {
            const response = await getAllCars();
            setCars(response.data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };
    return (
     <div>
      <h2>Cars</h2>
      {cars.map(car => (
        <p key={car.id}>{car.brand} {car.model} {car.year}</p>
      ))}
    </div>
)
}
