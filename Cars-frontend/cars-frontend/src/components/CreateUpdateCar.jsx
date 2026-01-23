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
      navigate("/cars");
    } catch (err) {
      alert("Error saving car. Please try again.");
      console.error("Error saving car:", err);
    }
  };

  if (loading) return <div className="container mt-4">Loading car data...</div>;

  return (
    <section className="max-w-4xl mx-auto pt-24 p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[#F3F4F4]">
          {id ? "Update car" : "Add a new car"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-6 mt-4">
            <div className="sm:col-span-3">
              <label className="block mb-2 text-sm font-bold">Car brand</label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="bg-[#2d4648] border border-gray-900 text-sm rounded-lg block w-full p-2.5 "
                placeholder="Lexus"
                required
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Model</label>
              <input
                type="text"
                name="model"
                value={form.model}
                onChange={handleChange}
                className="bg-[#2d4648] border border-gray-900 text-sm rounded-lg block w-full p-2.5 "
                placeholder="Hybrid"
                required
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Color</label>
              <input
                type="text"
                name="color"
                value={form.color}
                onChange={handleChange}
                className="bg-[#2d4648] border border-gray-900 text-sm rounded-lg block w-full p-2.5 "
                placeholder="White"
                required
              />
            </div>

             <div className="w-full">
              <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Year</label>
              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleChange}
                min="1900"
                max="2099"
                className="bg-[#2d4648] border border-gray-900 text-sm rounded-lg block w-full p-2.5 "
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-6">
            <button
              type="submit"
              className="bg-[#425341] hover:bg-[#5c6d5b] text-white px-4 py-2 rounded-lg transition-colors shadow-md cursor-pointer"
            >
              {id ? "Update car" : "Create car"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/cars")}
              className="bg-[#5F160D] hover:bg-[#a04c41] text-white px-4 py-2 rounded-md cursor-pointer">
              {id ? "Cancel" : "Back"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}