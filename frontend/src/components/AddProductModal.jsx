import React from "react";
import { useProductStore } from "../store/useProductStore";
import { DollarSignIcon, ImageIcon, Package2Icon } from "lucide-react";

function AddProductModal() {
  const { addProduct, formData, setFormData } = useProductStore();
  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box"></div>
    </dialog>
  );
}

export default AddProductModal;
