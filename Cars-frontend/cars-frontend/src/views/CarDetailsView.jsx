import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById } from "../api/carsCRUDApi.js";

export default function CarDetailsView() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    fetchCars();
  }, [id]);

  const fetchCars = async () => {
    try {
      const { data } = await getCarById(id);
      setCar(data[0]);
    } catch (err) {
      console.error("Error loading car:", err);
    }
  };

  if (!car) {
    return <div className="details-container">Loading car details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto pt-24 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#F3F4F4]">Car info</h1>

        <div className="flex-col grid gap-4 mt-4  sm:grid-cols-4 justify-between items-center p-4 rounded-xl">
          <div>
            <label className="block mb-2 text-sm font-bold">Car brand</label>
            <p className="bg-[#2d4648] border border-gray-900 text-sm rounded-lg block p-2.5">{car.brand || "N/A"}</p>
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold">Model</label>
            <p className="bg-[#2d4648] border border-gray-900 text-sm rounded-lg block p-2.5">{car.model || "N/A"}</p>
          </div>

          <div>
            <label className="block mb-2 text-sm font-bold">Color</label>
            <p className="bg-[#2d4648] border border-gray-900 text-sm rounded-lg block p-2.5">{car.color || "N/A"}</p>
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold">Year</label>
            <p className="bg-[#2d4648] border border-gray-900 text-sm rounded-lg block p-2.5">{car.year || "N/A"}</p>
          </div>
          <div>
          <button
            type="button"
            className="bg-[#5F160D] hover:bg-[#a04c41] text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => navigate("/cars")}>
            {id ? "Back" : "Back"}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}