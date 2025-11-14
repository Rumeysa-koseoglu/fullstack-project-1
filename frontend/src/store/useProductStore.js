import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

//backend API base URL
const BASE_URL = "http://localhost:3000";

//we create zustand store for product data
export const useProductStore = create((set, get) => ({
  //product state
  products: [], //we list all products here
  loading: false, // it will be true when we fetching data
  error: null, // its our store error message (if something goes wrong)
  currentProduct: null,

  //form state
  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully");
      document.getElementById("add_product_modal").close();
    } catch (error) {
      console.log("Error in addProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

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

  //a function to delete product by id
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      //we send DELETE request to backend
      await axios.delete(`${BASE_URL}/api/products/${id}`);

      //remove deleted product from state
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      //we show success message on the UI side when deleteProduct function is succeed
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log("Error in deleteProduct function", error);
      //we show error message when the function is fails
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data, // prefill form with current product data
        error: null,
      });
    } catch (error) {
      console.log("Error in fetchProduct function", error);
      set({ error: "Something went wrong", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },
}));
