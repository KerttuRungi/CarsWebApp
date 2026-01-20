import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createCar, getCarById, updateCar } from "../api/carsCRUDApi.js";

export default function CreateUpdateCar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    brand: "",
    color: "",
    model: "",
    year: new Date().getFullYear(), // Default to current year
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getCarById(id)
        .then(({ data }) => {
          setForm({
            brand: data[0].brand || "",
            color: data[0].color || "",
            model: data[0].model || "",
            year: data[0].year || "",
          });
        })
        .catch((err) => console.error("Could not fetch car details", err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    //convert number inputs to numbers
    const finalValue = type === "number" ? parseInt(value, 10) : value;
    
    setForm({ ...form, [name]: finalValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await updateCar(id, form);
      } else {
        await createCar(form);
      }
      navigate("/");
    } catch (err) {
      alert("Error saving car. Please try again.");
      console.error("Error saving car:", err);
    }
  };

  if (loading) return <div className="container mt-4">Loading car data...</div>;

  return (
    <div className="container mt-4">
      <h2>{id ? "Update car" : "Add a new car"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Car brand </label>
          <input
            type="text"
            className="form-control"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Color </label>
          <input
            type="text"
            className="form-control"
            name="color"
            value={form.color}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Model </label>
          <input
            type="text"
            className="form-control"
            name="model"
            value={form.model}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Year </label>
          <input
            type="number"
            className="form-control"
            name="year"
            value={form.year}
            onChange={handleChange}
            min="1900"
            max="2099"
            required
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            {id ? "Update car" : "Create car"}
          </button>

          <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>
            {id ? "Cancel" : "Back"}
          </button>
        </div>
      </form>
    </div>
  );
}