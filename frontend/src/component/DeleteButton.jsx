import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const DeleteTripButton = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        // Show confirmation alert
        const result = await Swal.fire({
            title: "Confirm Deletion",
            text: "Are you sure you want to delete this trip?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            confirmButtonColor: "#FF6200",
            cancelButtonColor: "#d33",
        });

        // If the user confirmed, proceed with deletion
        if (result.isConfirmed) {
            try {
                await axios.delete(`https://organisational-swift-flowy-64f7bee4.koyeb.app/${id}`);

                Swal.fire({
                    title: "Trip Deleted",
                    text: "The trip has been successfully deleted.",
                    icon: "success",
                    confirmButtonText: "View List Trip",
                    confirmButtonColor: "#FF6200",
                }).then(() => {
                    navigate("/");
                });

            } catch (error) {
                console.error("Error deleting trip:", error);

                Swal.fire({
                    title: "Error",
                    text: "Failed to delete the trip.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="mt-3 w-100 rounded-1 shadow-none p-1"
            style={{
                backgroundColor: "#FF6200",
                borderColor: "#FF6200",
                color: "white",
                transition: "all 0.3s ease",
                cursor: "pointer",
            }}
            onMouseOver={(e) => (e.target.style = "background-color: white; color: #FF6200; border-color: #FF6200;")}
            onMouseOut={(e) => (e.target.style = "background-color: #FF6200; color: white; border-color: #FF6200;")}
        >
            <strong>Delete Trip</strong>
        </button>
    );
};

export default DeleteTripButton;
