import { create } from "zustand";
import axios from "axios";

//backend API base URL
const BASE_URL = "http://localhost:3000";

//we create zustand store for product data
export const useProductStore = create((set, get) => ({
  //product state
  products: [], //we list all products here
  loading: false, // it will be true when we fetching data
  error: null, // its our store error message (if something goes wrong)

  //we defined a function to get products from backend
  fetchProducts: async () => {
    //to show loading spinner
    set({ loading: true });
    try {
      //we send a GET request to backend API
      const response = await axios.get(`${BASE_URL}/api/products`);
      //update products with recieved data
      set({ products: response.data.data, error: null });
    } catch (err) {
      //handle rate limit error
      if (err.status == 429)
        set({ error: "Rate limit exceeded", products: [] });
      else set({ error: "Something went wrong" });
    } finally {
      //to stop loading spinner
      set({ loading: false });
    }
  },
}));
