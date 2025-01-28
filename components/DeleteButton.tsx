"use client";

import { toast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { ToastAction } from "./ui/toast";


interface DeleteButtonProps {
  id: string; // The ID of the resource to delete
  resourceType: "remove-post" | "remove-product" | "remove-plan"; // The type of resource
}

const DeleteButton = ({ id, resourceType }: DeleteButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteResource = async () => {
    toast({
      title: `Delete ${resourceType}?`,
      description: "This action cannot be undone.",
      action: (
        <>
          {/* Confirm Action */}
          <ToastAction
            className="bg-red-500"
            altText="Confirm Delete"
            onClick={async () => {
              setIsDeleting(true); // Start loading
              try {
                // Dynamically construct the API endpoint based on resource type
                const response = await fetch(`/api/${resourceType}/${id}`, {
                  method: "DELETE",
                });

                if (response.ok) {
                  toast({
                    title: "Success",
                    description: `${resourceType} deleted successfully.`,
                  });
                  window.location.reload(); // Reload the page to reflect changes
                } else {
                  toast({
                    title: "Error",
                    description: `Failed to delete the ${resourceType}.`,
                  });
                }
              } catch (error) {
                console.error(`Error deleting ${resourceType}:`, error);
                toast({
                  variant: "destructive",
                  title: "Error",
                  description: "An error occurred while deleting the resource.",
                });
              } finally {
                setIsDeleting(false); // End loading
              }
            }}
          >
            Confirm
          </ToastAction>

          {/* Cancel Action */}
          <ToastAction className="bg-black text-white-100" altText="Cancel Delete" onClick={() => {}}>
            Cancel
          </ToastAction>
        </>
      ),
    });
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
