import axios from "axios";

const API_URL = "https://carswebapp20260124151948.azurewebsites.net/api/cars";

// GET all cars
export const getAllCars = async () => {
  return axios.get(API_URL);
};

// GET by id (details)
export const getCarById = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// CREATE 
export const createCar = async (carDto) => {
  return axios.post(API_URL, carDto);
};

// UPDATE 
export const updateCar = async (id, carDto) => {
  return axios.put(`${API_URL}?Id=${id}`, carDto);
};

// DELETE 
export const deleteCar = async (id) => {
  return axios.delete(`${API_URL}/${id}`, {
    data: { id: id } 
  });
};
