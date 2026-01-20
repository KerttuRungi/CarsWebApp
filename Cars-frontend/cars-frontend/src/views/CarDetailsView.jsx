import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById } from "../api/carsCRUDApi.js";

export default function CarDetailsView() {
  const {id} = useParams();
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
    <div className="details-container">

      <h1 className="detailspage-title">Car details</h1>

      <div className="car-details">
            <p>Brand: {car.brand || "N/A"}</p>
            <p>Year: {car.year || "N/A"}</p>
            <p>Color: {car.color || "N/A"}</p>
      <button
          type="button"
          className="btn btn-secondary bg-pink"
          onClick={() => navigate("/")}>
          {id ? "Back" : "Back"}
        </button>
      </div>
    </div>
  );
}