import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:2000";

export const useProductStore = create((set, get) => ({
  // intial products state
  products: [],
  loading: false,
  error: null,
  
  //form data state 
  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData:(formData) => set({formData}),
  resetForm:() => set({formData: {name: "", price: "", image: ""}}),

  addProduct: async (e) => {
    e.preventDefault();
    set({loading: true})
    try {
      const {formData} = get()
      await axios.post(`${BASE_URL}/api/products`, formData)
      await get.fetchProducts()
      get().resetForm()
      toast.success("Product created sucessfully")
      document.getElementById("add_product_modal").closest()
    } catch (error) {
      console.log("Error while creating product......");
      toast.error("Failed to create product")
    }finally{
    set({loading: false})
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch (error) {
      if (error.status == 429)
        set({ error: "Rate limit exceeded", products: [] });
      else set(error);
      console.log(
        "Error while fetching product in UseProductStore.js file................",
      );
    } finally {
      set({ loading: false });
    }
  },

  deletProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log("Error in deleteProduct function", error);
      toast.error("Cant delet product");
    } finally {
      set({ loading: false });
    }
  },
}))
