import React from "react";
import { useProductStore } from "../store/useProductStore";
import { DollarSignIcon, ImageIcon, Package2Icon } from "lucide-react";

function AddProductModal() {
  const { addProduct, formData, setFormData } = useProductStore();
  return <div>AddProductModal</div>;
}

export default AddProductModal;
