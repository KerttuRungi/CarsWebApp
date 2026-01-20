import React from "react";
import { getAllCars, deleteCar } from "../api/carsCRUDApi.js";
import { Link } from "react-router-dom";


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

  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteCar(id);
        fetchCars();
      } catch (error) {
        alert("Failed to delete the car.");
        console.error("Error deleting car:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-F3F4F4">Your cars </h2>
        <Link 
          to="/create" 
          className="bg-green-600 hover:bg-green-700 text-F3F4F4 px-4 py-2 rounded-lg transition-colors shadow-md"
        >
          + Add a Car
        </Link>
      </div>

      <div className="grid gap-4">
        {cars.length === 0 ? (
          <p className="text-gray-500 italic">No cars found. Add yours!</p>
        ) : (
          cars.map((car) => (
            <div key={car.id} className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{car.brand} {car.model}</h3>
                <p className="text-gray-500">{car.year} • <span className="capitalize">{car.color}</span></p>
              </div>

                <Link 
                  to={`/update/${car.id}`} 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-100 transition-colors font-medium">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(car.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
  }