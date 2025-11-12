import React from "react";
import { useProductStore } from "../store/useProductStore";
import { DollarSignIcon, ImageIcon, Package2Icon } from "lucide-react";

function AddProductModal() {
  const { addProduct, formData, setFormData } = useProductStore();
  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box">
        {/* CLOSE BUTTON */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            X
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default AddProductModal;
