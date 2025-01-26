"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";


interface DeleteButtonProps {
  id: string; // The ID of the resource to delete
  resourceType: "remove-post" | "remove-product" | "remove-plan"; // The type of resource
}

const DeleteButton = ({ id, resourceType }: DeleteButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteResource = async () => {
    if (confirm(`Are you sure you want to delete this ${resourceType.slice(0, -1)}?`)) {
      try {
        setIsDeleting(true);

        // Dynamically construct the API endpoint based on resource type
        const response = await fetch(`/api/${resourceType}/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert(`${resourceType.slice(0, -1).toUpperCase()} deleted successfully.`);
          window.location.reload(); // Reload to reflect changes
        } else {
          alert(`Failed to delete the ${resourceType.slice(0, -1)}.`);
        }
      } catch (error) {
        console.error(`Error deleting ${resourceType.slice(0, -1)}:`, error);
        alert("An error occurred while deleting the resource.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Trash2
      onClick={deleteResource}
      className={`size-6 cursor-pointer hover:size-7 ${
        isDeleting ? "opacity-50 cursor-not-allowed" : "text-primary"
      }`}
    />
  );
};

export default DeleteButton;
